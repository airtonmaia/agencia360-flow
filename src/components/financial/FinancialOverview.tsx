import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

export const FinancialOverview = () => {
  const overview = {
    totalReceita: 45000,
    totalDespesas: 22000,
    saldoLiquido: 23000,
    receitaVariacao: 12.5,
    despesasVariacao: -8.2,
    proximosVencimentos: 5,
    contasEmAtraso: 2
  };

  const recentTransactions = [
    {
      id: 1,
      description: "Pagamento - Website TechCorp",
      amount: 8500,
      type: "receita",
      date: "Hoje",
      client: "TechCorp"
    },
    {
      id: 2,
      description: "Assinatura Adobe Creative",
      amount: -299,
      type: "despesa",
      date: "Ontem",
      category: "Software"
    },
    {
      id: 3,
      description: "Freelancer - Design UI",
      amount: -1200,
      type: "despesa",
      date: "2 dias atrás",
      category: "Freelancer"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Visão Geral Financeira</h1>
        <p className="text-muted-foreground">Acompanhe a saúde financeira da sua agência</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold text-foreground">R$ {overview.totalReceita.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">+{overview.receitaVariacao}%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-button rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Despesas Totais</p>
              <p className="text-2xl font-bold text-foreground">R$ {overview.totalDespesas.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">{overview.despesasVariacao}%</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Saldo Líquido</p>
              <p className="text-2xl font-bold text-foreground">R$ {overview.saldoLiquido.toLocaleString()}</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">Positivo</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Próximos Vencimentos</p>
              <p className="text-2xl font-bold text-foreground">{overview.proximosVencimentos}</p>
              <div className="flex items-center gap-1 mt-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-500">{overview.contasEmAtraso} em atraso</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Transações Recentes</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-2">
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date} • {transaction.client || transaction.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'receita' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'receita' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      transaction.type === 'receita' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {transaction.type === 'receita' ? 'Receita' : 'Despesa'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Resumo do Mês</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Meta de Receita</span>
              <span className="font-medium">R$ 50.000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-button h-2 rounded-full"
                style={{ width: '90%' }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground">90% da meta atingida</div>
            
            <hr className="my-4" />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Projetos Faturados</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ticket Médio</span>
                <span className="font-medium">R$ 5.625</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Margem de Lucro</span>
                <span className="font-medium text-green-600">51%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};