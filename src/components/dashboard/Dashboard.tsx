import { DollarSign, Users, FolderKanban, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-1">Bem-vindo à Agência360</h1>
        <p className="text-primary-foreground/90">
          Gerencie seus projetos, clientes e finanças em um só lugar
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Receita Mensal"
          value="R$ 45.280"
          change="+12% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-muted-foreground"
        />
        <MetricCard
          title="Projetos Ativos"
          value="18"
          change="3 novos esta semana"
          changeType="positive"
          icon={FolderKanban}
          iconColor="text-primary"
        />
        <MetricCard
          title="Clientes Ativos"
          value="24"
          change="2 novos este mês"
          changeType="positive"
          icon={Users}
          iconColor="text-accent-foreground"
        />
        <MetricCard
          title="Tarefas Pendentes"
          value="7"
          change="3 em atraso"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-warning"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Ações Rápidas</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start h-11" size="lg">
              <Users className="w-4 h-4 mr-3" />
              Adicionar Novo Cliente
            </Button>
            <Button variant="outline" className="w-full justify-start h-11" size="lg">
              <FolderKanban className="w-4 h-4 mr-3" />
              Criar Novo Projeto
            </Button>
            <Button variant="outline" className="w-full justify-start h-11" size="lg">
              <Calendar className="w-4 h-4 mr-3" />
              Agendar Reunião
            </Button>
            <Button variant="outline" className="w-full justify-start h-11" size="lg">
              <DollarSign className="w-4 h-4 mr-3" />
              Registrar Pagamento
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Atividade Recente</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">Projeto "Website Empresa X" concluído</p>
                <p className="text-xs text-muted-foreground mt-1">Há 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">Novo cliente "Tech Solutions" adicionado</p>
                <p className="text-xs text-muted-foreground mt-1">Ontem</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground">Pagamento de R$ 3.500 recebido</p>
                <p className="text-xs text-muted-foreground mt-1">2 dias atrás</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Section Placeholder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          Visão Financeira
        </h3>
        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">Gráfico de receitas/despesas será implementado aqui</p>
          </div>
        </div>
      </Card>
    </div>
  );
};