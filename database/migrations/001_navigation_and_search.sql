-- Migration 001: Navigation History and Chat Search
-- Created: 2025-01-20
-- Purpose: Add navigation history tracking and full-text search for chats

-- ================================
-- 1. Navigation History Table
-- ================================
CREATE TABLE IF NOT EXISTS navigation_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Navigation context
  previous_url TEXT NOT NULL,
  previous_title TEXT,
  current_url TEXT NOT NULL,

  -- Page context for AI assistants
  section TEXT, -- 'library', 'course', 'community', 'dashboard'
  content_type TEXT, -- 'article', 'lesson', 'discussion', 'chat'
  content_id TEXT,

  -- Technical details
  scroll_position INTEGER DEFAULT 0,
  viewport_width INTEGER,
  viewport_height INTEGER,
  user_agent TEXT,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT,

  -- Indexing
  CONSTRAINT valid_urls CHECK (
    previous_url ~ '^/.*' AND
    current_url ~ '^/.*'
  )
);

-- Indexes for performance
CREATE INDEX idx_navigation_history_user_id ON navigation_history(user_id);
CREATE INDEX idx_navigation_history_created_at ON navigation_history(created_at DESC);
CREATE INDEX idx_navigation_history_session ON navigation_history(session_id);
CREATE INDEX idx_navigation_history_section ON navigation_history(section);

-- RLS (Row Level Security)
ALTER TABLE navigation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own navigation history" ON navigation_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own navigation history" ON navigation_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ================================
-- 2. Chat Search Index Table
-- ================================
CREATE TABLE IF NOT EXISTS chat_search_index (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Chat context
  chat_session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  message_id UUID,

  -- Content for search
  message_content TEXT NOT NULL,
  message_role TEXT NOT NULL CHECK (message_role IN ('user', 'assistant')),
  assistant_type TEXT CHECK (assistant_type IN ('navigator', 'skipper')),

  -- Search metadata
  chat_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_timestamp TIMESTAMP WITH TIME ZONE,

  -- Full-text search vector
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('russian', COALESCE(chat_title, '')), 'A') ||
    setweight(to_tsvector('russian', message_content), 'B') ||
    setweight(to_tsvector('english', COALESCE(chat_title, '')), 'C') ||
    setweight(to_tsvector('english', message_content), 'D')
  ) STORED
);

-- Indexes for full-text search
CREATE INDEX idx_chat_search_fts ON chat_search_index USING GIN (search_vector);
CREATE INDEX idx_chat_search_user_id ON chat_search_index(user_id);
CREATE INDEX idx_chat_search_created_at ON chat_search_index(created_at DESC);
CREATE INDEX idx_chat_search_session ON chat_search_index(chat_session_id);
CREATE INDEX idx_chat_search_assistant_type ON chat_search_index(assistant_type);

-- RLS (Row Level Security)
ALTER TABLE chat_search_index ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chat search index" ON chat_search_index
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat search index" ON chat_search_index
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chat search index" ON chat_search_index
  FOR UPDATE USING (auth.uid() = user_id);

-- ================================
-- 3. Functions for Search
-- ================================

-- Function to search chats with ranking
CREATE OR REPLACE FUNCTION search_user_chats(
  search_query TEXT,
  user_uuid UUID DEFAULT auth.uid(),
  limit_count INTEGER DEFAULT 20
)
RETURNS TABLE (
  chat_session_id UUID,
  chat_title TEXT,
  message_content TEXT,
  message_role TEXT,
  assistant_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  rank REAL
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    csi.chat_session_id,
    csi.chat_title,
    LEFT(csi.message_content, 200) as message_content, -- Snippet
    csi.message_role,
    csi.assistant_type,
    csi.created_at,
    ts_rank_cd(csi.search_vector, websearch_to_tsquery('russian', search_query)) as rank
  FROM chat_search_index csi
  WHERE
    csi.user_id = user_uuid
    AND csi.search_vector @@ websearch_to_tsquery('russian', search_query)
  ORDER BY rank DESC, csi.created_at DESC
  LIMIT limit_count;
END;
$$;

-- Function to get recent navigation context
CREATE OR REPLACE FUNCTION get_user_navigation_context(
  user_uuid UUID DEFAULT auth.uid(),
  limit_count INTEGER DEFAULT 1
)
RETURNS TABLE (
  previous_url TEXT,
  previous_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    nh.previous_url,
    nh.previous_title,
    nh.created_at
  FROM navigation_history nh
  WHERE
    nh.user_id = user_uuid
  ORDER BY nh.created_at DESC
  LIMIT limit_count;
END;
$$;

-- ================================
-- 4. Triggers for automatic indexing
-- ================================

-- Function to automatically index new chat messages
CREATE OR REPLACE FUNCTION index_chat_message()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into search index if it's a substantial message
  IF LENGTH(NEW.content) > 10 THEN
    INSERT INTO chat_search_index (
      user_id,
      chat_session_id,
      message_id,
      message_content,
      message_role,
      assistant_type,
      chat_title,
      message_timestamp
    )
    SELECT
      NEW.user_id,
      NEW.session_id,
      NEW.id,
      NEW.content,
      NEW.role,
      NEW.assistant_type,
      cs.title,
      NEW.created_at
    FROM chat_sessions cs
    WHERE cs.id = NEW.session_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic indexing
-- Note: This assumes chat_messages table exists
-- DROP TRIGGER IF EXISTS trigger_index_chat_message ON chat_messages;
-- CREATE TRIGGER trigger_index_chat_message
--   AFTER INSERT ON chat_messages
--   FOR EACH ROW
--   EXECUTE FUNCTION index_chat_message();

-- ================================
-- 5. Sample data and testing
-- ================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON navigation_history TO authenticated;
GRANT ALL ON chat_search_index TO authenticated;
GRANT EXECUTE ON FUNCTION search_user_chats TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_navigation_context TO authenticated;

-- ================================
-- 6. Comments and documentation
-- ================================

COMMENT ON TABLE navigation_history IS 'Stores user navigation history for back button functionality and analytics';
COMMENT ON TABLE chat_search_index IS 'Full-text search index for chat messages with Russian and English support';
COMMENT ON FUNCTION search_user_chats IS 'Performs full-text search across user chat messages with ranking';
COMMENT ON FUNCTION get_user_navigation_context IS 'Retrieves recent navigation context for back button functionality';

-- ================================
-- End of Migration 001
-- ================================