import { DollarSign, Users, FolderKanban, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary text-white p-8 rounded-xl shadow-soft">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo à Agência360</h1>
        <p className="text-white/90 text-lg">
          Gerencie seus projetos, clientes e finanças em um só lugar
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Mensal"
          value="R$ 45.280"
          change="+12% vs mês anterior"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-success"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Ações Rápidas</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Users className="w-4 h-4 mr-2" />
              Adicionar Novo Cliente
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <FolderKanban className="w-4 h-4 mr-2" />
              Criar Novo Projeto
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Reunião
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <DollarSign className="w-4 h-4 mr-2" />
              Registrar Pagamento
            </Button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Atividade Recente</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Projeto "Website Empresa X" concluído</p>
                <p className="text-xs text-muted-foreground">Há 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Novo cliente "Tech Solutions" adicionado</p>
                <p className="text-xs text-muted-foreground">Ontem</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-sm">Pagamento de R$ 3.500 recebido</p>
                <p className="text-xs text-muted-foreground">2 dias atrás</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Section Placeholder */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Visão Financeira
        </h3>
        <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Gráfico de receitas/despesas será implementado aqui</p>
        </div>
      </Card>
    </div>
  );
};