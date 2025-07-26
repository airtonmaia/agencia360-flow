import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ProjectsView } from "@/components/projects/ProjectsView";
import { ClientsView } from "@/components/clients/ClientsView";
import { FinancialOverview } from "@/components/financial/FinancialOverview";
import { CashFlow } from "@/components/financial/CashFlow";
import { Loans } from "@/components/financial/Loans";

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
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
