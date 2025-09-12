'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Coins, 
  Users, 
  Vote, 
  TrendingUp,
  Calendar,
  ExternalLink,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { useAppContext } from '@/lib/contexts/app-context';

export default function DAOPage() {
  const { language } = useAppContext();

  const daoStats = {
    totalMembers: 2847,
    activeProposals: 5,
    totalTVL: '$12.4M',
    governanceToken: 'DSAIL',
  };

  const proposals = [
    {
      id: '1',
      title: language === 'ru' ? 'Увеличение награды за стейкинг' : 'Increase staking rewards',
      description: language === 'ru' 
        ? 'Предложение увеличить годовую доходность стейкинга с 8% до 12%'
        : 'Proposal to increase annual staking yield from 8% to 12%',
      status: 'active',
      votesFor: 12450,
      votesAgainst: 3210,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      quorum: 85,
    },
    {
      id: '2',
      title: language === 'ru' ? 'Новый партнерский протокол' : 'New partner protocol',
      description: language === 'ru'
        ? 'Интеграция с протоколом DeFi для расширения функционала'
        : 'DeFi protocol integration to expand functionality',
      status: 'active',
      votesFor: 8900,
      votesAgainst: 1200,
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      quorum: 92,
    },
    {
      id: '3',
      title: language === 'ru' ? 'Обновление UI/UX' : 'UI/UX update',
      description: language === 'ru'
        ? 'Редизайн интерфейса для улучшения пользовательского опыта'
        : 'Interface redesign to improve user experience',
      status: 'passed',
      votesFor: 15670,
      votesAgainst: 2340,
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      quorum: 94,
    },
    {
      id: '4',
      title: language === 'ru' ? 'Изменение комиссий' : 'Fee structure change',
      description: language === 'ru'
        ? 'Снижение комиссий за транзакции в экосистеме'
        : 'Reduction of transaction fees in the ecosystem',
      status: 'rejected',
      votesFor: 4500,
      votesAgainst: 11200,
      endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      quorum: 67,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusText = {
      active: language === 'ru' ? 'Активно' : 'Active',
      passed: language === 'ru' ? 'Принято' : 'Passed',
      rejected: language === 'ru' ? 'Отклонено' : 'Rejected',
    };

    const variant = status === 'active' ? 'default' : status === 'passed' ? 'default' : 'destructive';
    
    return (
      <Badge variant={variant} className={
        status === 'passed' ? 'bg-green-500 hover:bg-green-600' : ''
      }>
        {statusText[status as keyof typeof statusText]}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent">
            DAOsail DAO
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'ru'
              ? 'Участвуйте в управлении протоколом и влияйте на его развитие'
              : 'Participate in protocol governance and influence its development'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold">{daoStats.totalMembers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'ru' ? 'Участников' : 'Members'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Vote className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold">{daoStats.activeProposals}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'ru' ? 'Активных голосований' : 'Active proposals'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold">{daoStats.totalTVL}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'ru' ? 'Общий TVL' : 'Total TVL'}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-2xl font-bold">{daoStats.governanceToken}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'ru' ? 'Токен управления' : 'Governance token'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Proposals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Vote className="h-6 w-6" />
              {language === 'ru' ? 'Голосования' : 'Proposals'}
            </h2>
            <Button>
              {language === 'ru' ? 'Создать предложение' : 'Create proposal'}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(proposal.status)}
                          <h3 className="font-semibold text-lg">{proposal.title}</h3>
                          {getStatusBadge(proposal.status)}
                        </div>
                        <p className="text-muted-foreground">{proposal.description}</p>
                      </div>
                    </div>

                    {proposal.status === 'active' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {language === 'ru' ? 'За:' : 'For:'} {proposal.votesFor.toLocaleString()}
                          </span>
                          <span>
                            {language === 'ru' ? 'Против:' : 'Against:'} {proposal.votesAgainst.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%`
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {language === 'ru' ? 'Окончание:' : 'Ends:'} {formatDate(proposal.endDate)}
                          </div>
                          <div>
                            {language === 'ru' ? 'Кворум:' : 'Quorum:'} {proposal.quorum}%
                          </div>
                        </div>
                      </div>
                    )}

                    {proposal.status !== 'active' && (
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>
                          {language === 'ru' ? 'За:' : 'For:'} {proposal.votesFor.toLocaleString()} | {' '}
                          {language === 'ru' ? 'Против:' : 'Against:'} {proposal.votesAgainst.toLocaleString()}
                        </div>
                        <div>
                          {language === 'ru' ? 'Завершено:' : 'Ended:'} {formatDate(proposal.endDate)}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm text-muted-foreground">
                        ID: {proposal.id}
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          {language === 'ru' ? 'Подробнее' : 'Details'}
                        </Button>
                        {proposal.status === 'active' && (
                          <Button size="sm">
                            {language === 'ru' ? 'Голосовать' : 'Vote'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to participate */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ru' ? 'Как участвовать в управлении?' : 'How to participate in governance?'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Coins className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {language === 'ru' ? '1. Получите токены' : '1. Get tokens'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ru'
                    ? 'Приобретите или заработайте токены DSAIL для участия в голосованиях'
                    : 'Purchase or earn DSAIL tokens to participate in voting'
                  }
                </p>
              </div>
              
              <div className="text-center p-4">
                <Vote className="h-12 w-12 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {language === 'ru' ? '2. Голосуйте' : '2. Vote'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ru'
                    ? 'Изучайте предложения и голосуйте за развитие протокола'
                    : 'Review proposals and vote for protocol development'
                  }
                </p>
              </div>
              
              <div className="text-center p-4">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {language === 'ru' ? '3. Участвуйте' : '3. Participate'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ru'
                    ? 'Присоединяйтесь к дискуссиям и создавайте собственные предложения'
                    : 'Join discussions and create your own proposals'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}