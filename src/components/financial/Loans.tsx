import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Filter, Search, CreditCard, Building, Wallet, Calendar } from "lucide-react";

export const Loans = () => {
  const loans = [
    {
      id: 1,
      type: "emprestimo",
      title: "Empréstimo Banco do Brasil",
      amount: 50000,
      remainingAmount: 32000,
      installments: "8/12",
      monthlyPayment: 4800,
      nextDue: "25/03/2024",
      status: "ativo",
      interestRate: 1.8
    },
    {
      id: 2,
      type: "financiamento",
      title: "Financiamento Equipamentos",
      amount: 25000,
      remainingAmount: 18500,
      installments: "6/10",
      monthlyPayment: 2850,
      nextDue: "15/03/2024",
      status: "ativo",
      interestRate: 1.2
    },
    {
      id: 3,
      type: "cartao",
      title: "Cartão Corporativo Itaú",
      amount: 12000,
      remainingAmount: 8400,
      installments: "4/6",
      monthlyPayment: 2100,
      nextDue: "10/03/2024",
      status: "ativo",
      interestRate: 2.5
    },
    {
      id: 4,
      type: "emprestimo",
      title: "Capital de Giro Santander",
      amount: 30000,
      remainingAmount: 0,
      installments: "12/12",
      monthlyPayment: 0,
      nextDue: "-",
      status: "quitado",
      interestRate: 2.1
    }
  ];

  const upcomingPayments = [
    {
      id: 1,
      title: "Cartão Corporativo Itaú",
      amount: 2100,
      dueDate: "10/03/2024",
      daysLeft: 2,
      type: "cartao"
    },
    {
      id: 2,
      title: "Financiamento Equipamentos",
      amount: 2850,
      dueDate: "15/03/2024",
      daysLeft: 7,
      type: "financiamento"
    },
    {
      id: 3,
      title: "Empréstimo Banco do Brasil",
      amount: 4800,
      dueDate: "25/03/2024",
      daysLeft: 17,
      type: "emprestimo"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emprestimo": return Building;
      case "financiamento": return Wallet;
      case "cartao": return CreditCard;
      default: return Wallet;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "emprestimo": return "Empréstimo";
      case "financiamento": return "Financiamento";
      case "cartao": return "Cartão";
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-100 text-green-700";
      case "quitado": return "bg-blue-100 text-blue-700";
      case "atraso": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "text-red-600";
    if (daysLeft <= 7) return "text-orange-600";
    return "text-green-600";
  };

  const totalDebt = loans
    .filter(loan => loan.status === "ativo")
    .reduce((acc, loan) => acc + loan.remainingAmount, 0);

  const monthlyPayments = loans
    .filter(loan => loan.status === "ativo")
    .reduce((acc, loan) => acc + loan.monthlyPayment, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Empréstimos & Financiamentos</h1>
          <p className="text-muted-foreground">Controle de empréstimos, financiamentos e parcelas</p>
        </div>
        <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Novo Empréstimo
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total em Débito</p>
              <p className="text-2xl font-bold text-red-600">R$ {totalDebt.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pagamentos Mensais</p>
              <p className="text-2xl font-bold text-orange-600">R$ {monthlyPayments.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contratos Ativos</p>
              <p className="text-2xl font-bold text-blue-600">
                {loans.filter(loan => loan.status === "ativo").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Próximos Vencimentos */}
      <Card className="p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Próximos Vencimentos</h3>
        <div className="space-y-4">
          {upcomingPayments.map((payment) => {
            const Icon = getTypeIcon(payment.type);
            return (
              <div key={payment.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-button rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{payment.title}</p>
                    <p className="text-sm text-muted-foreground">Vencimento: {payment.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">R$ {payment.amount.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${getDaysLeftColor(payment.daysLeft)}`}>
                    {payment.daysLeft} dias restantes
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar empréstimos..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Lista de Empréstimos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loans.map((loan) => {
          const Icon = getTypeIcon(loan.type);
          const progress = loan.status === "quitado" ? 100 : ((loan.amount - loan.remainingAmount) / loan.amount) * 100;
          
          return (
            <Card key={loan.id} className="p-6 border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-button rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{loan.title}</h4>
                      <Badge className={getStatusColor(loan.status)}>
                        {loan.status === "ativo" ? "Ativo" : loan.status === "quitado" ? "Quitado" : "Em Atraso"}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(loan.type)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Valor Total</p>
                    <p className="font-medium">R$ {loan.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Restante</p>
                    <p className="font-medium text-red-600">
                      R$ {loan.remainingAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Parcelas</p>
                    <p className="font-medium">{loan.installments}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Juros</p>
                    <p className="font-medium">{loan.interestRate}% a.m.</p>
                  </div>
                </div>

                {loan.status === "ativo" && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-button h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-muted-foreground">Próximo Pagamento</p>
                        <p className="font-medium">R$ {loan.monthlyPayment.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Vencimento</p>
                        <p className="font-medium">{loan.nextDue}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};