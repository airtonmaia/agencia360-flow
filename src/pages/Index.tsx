import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { ClientsView } from "@/components/clients/ClientsView";
import { FinancialOverview } from "@/components/financial/FinancialOverview";
import { CashFlow } from "@/components/financial/CashFlow";
import { Loans } from "@/components/financial/Loans";
import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <ProjectsView />;
      case "clients":
        return <ClientsView />;
      case "financial-overview":
        return <FinancialOverview />;
      case "financial-cashflow":
        return <CashFlow />;
      case "financial-loans":
        return <Loans />;
      case "financial":
        return <FinancialOverview />;
      case "time":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Módulo Produtividade</h2>
            <p className="text-muted-foreground">Em desenvolvimento</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Configurações</h2>
            <p className="text-muted-foreground">Em desenvolvimento</p>
          </div>
        );
      case "help":
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Ajuda & Suporte</h2>
            <p className="text-muted-foreground">Em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <SidebarTrigger className="-ml-1" />
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Pesquisar ou digite um comando..."
                  className="pl-10 bg-muted/50 border-border/60 focus:border-primary/60 transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
