import { Plus, Search, Filter, Phone, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ClientsView = () => {
  const clients = [
    {
      id: 1,
      name: "TechCorp Solutions",
      contact: "João Silva",
      email: "joao@techcorp.com",
      phone: "(11) 99999-9999",
      status: "Ativo",
      projects: 3,
      revenue: "R$ 25.000",
      lastContact: "2 dias atrás"
    },
    {
      id: 2,
      name: "StartupXYZ",
      contact: "Maria Santos",
      email: "maria@startupxyz.com",
      phone: "(11) 88888-8888",
      status: "Ativo",
      projects: 1,
      revenue: "R$ 15.000",
      lastContact: "1 semana atrás"
    },
    {
      id: 3,
      name: "Empresa ABC",
      contact: "Pedro Oliveira",
      email: "pedro@empresaabc.com",
      phone: "(11) 77777-7777",
      status: "Potencial",
      projects: 0,
      revenue: "R$ 0",
      lastContact: "3 dias atrás"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-success/20 text-success";
      case "Potencial": return "bg-warning/20 text-warning";
      case "Inativo": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie suas relações comerciais</p>
        </div>
        <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 shadow-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-sm text-muted-foreground">Total de Clientes</p>
          </div>
        </Card>
        <Card className="p-4 shadow-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">18</p>
            <p className="text-sm text-muted-foreground">Clientes Ativos</p>
          </div>
        </Card>
        <Card className="p-4 shadow-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">6</p>
            <p className="text-sm text-muted-foreground">Potenciais</p>
          </div>
        </Card>
      </div>

      {/* Clients List */}
      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="p-6 shadow-card hover:shadow-soft transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">Contato: {client.contact}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {client.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {client.phone}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right space-y-1">
                  <Badge className={`${getStatusColor(client.status)} text-xs`}>
                    {client.status}
                  </Badge>
                  <div className="text-sm">
                    <p className="font-medium">{client.revenue}</p>
                    <p className="text-muted-foreground">{client.projects} projeto(s)</p>
                  </div>
                </div>

                <div className="text-right text-sm text-muted-foreground">
                  <p>Último contato:</p>
                  <p>{client.lastContact}</p>
                </div>

                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};