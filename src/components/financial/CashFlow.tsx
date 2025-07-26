import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Search, TrendingUp, TrendingDown, Calendar } from "lucide-react";

export const CashFlow = () => {
  const cashFlowData = [
    {
      month: "Janeiro",
      receitas: 35000,
      despesas: 18000,
      saldo: 17000
    },
    {
      month: "Fevereiro", 
      receitas: 42000,
      despesas: 20000,
      saldo: 22000
    },
    {
      month: "Março",
      receitas: 45000,
      despesas: 22000,
      saldo: 23000
    }
  ];

  const transactions = [
    {
      id: 1,
      date: "15/03/2024",
      description: "Pagamento Website TechCorp",
      category: "Receita",
      amount: 8500,
      type: "entrada",
      status: "confirmado"
    },
    {
      id: 2,
      date: "14/03/2024",
      description: "Assinatura Adobe Creative",
      category: "Software",
      amount: -299,
      type: "saida",
      status: "pago"
    },
    {
      id: 3,
      date: "13/03/2024",
      description: "Freelancer Design UI",
      category: "Recursos Humanos",
      amount: -1200,
      type: "saida",
      status: "pago"
    },
    {
      id: 4,
      date: "20/03/2024",
      description: "App Mobile StartupXYZ - 2ª Parcela",
      category: "Receita",
      amount: 5000,
      type: "entrada",
      status: "pendente"
    },
    {
      id: 5,
      date: "25/03/2024",
      description: "Aluguel Escritório",
      category: "Infraestrutura",
      amount: -3500,
      type: "saida",
      status: "agendado"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "bg-green-100 text-green-700";
      case "pago": return "bg-blue-100 text-blue-700";
      case "pendente": return "bg-yellow-100 text-yellow-700";
      case "agendado": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmado": return "Confirmado";
      case "pago": return "Pago";
      case "pendente": return "Pendente";
      case "agendado": return "Agendado";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fluxo de Caixa</h1>
          <p className="text-muted-foreground">Controle entradas e saídas financeiras</p>
        </div>
        <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Resumo Mensal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cashFlowData.map((month, index) => (
          <Card key={month.month} className="p-6 border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{month.month}</h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Receitas
                  </span>
                  <span className="font-medium text-green-600">
                    R$ {month.receitas.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    Despesas
                  </span>
                  <span className="font-medium text-red-600">
                    R$ {month.despesas.toLocaleString()}
                  </span>
                </div>
                
                <hr className="my-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Saldo Líquido</span>
                  <span className={`font-bold ${month.saldo > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {month.saldo.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar transações..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Transações */}
      <Card className="border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Transações Recentes</h3>
          
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${
                      transaction.type === 'entrada' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{transaction.date}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{transaction.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(transaction.status)}>
                    {getStatusLabel(transaction.status)}
                  </Badge>
                  
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'entrada' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};