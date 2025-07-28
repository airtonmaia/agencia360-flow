import { LayoutDashboard, Users, FolderKanban, CreditCard, Clock, Settings, HelpCircle, ChevronRight, BarChart3, TrendingUp, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projetos", icon: FolderKanban },
  { id: "clients", label: "Clientes", icon: Users },
  { 
    id: "financial", 
    label: "Financeiro", 
    icon: CreditCard,
    subItems: [
      { id: "financial-overview", label: "Visão Geral" },
      { id: "financial-cashflow", label: "Fluxo de Caixa" },
      { id: "financial-loans", label: "Crédito & Investimentos" },
    ]
  },
  { id: "time", label: "Produtividade", icon: Clock },
];

const bottomItems = [
  { id: "settings", label: "Configurações", icon: Settings },
  { id: "help", label: "Ajuda & Suporte", icon: HelpCircle },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['financial']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isFinancialSubItem = (tabId: string) => {
    return tabId.startsWith('financial-');
  };

  const shouldHighlightFinancial = () => {
    return activeTab === 'financial' || isFinancialSubItem(activeTab);
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">Agência360°</h1>
        
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems.includes(item.id);
            const isActive = item.id === 'financial' ? shouldHighlightFinancial() : activeTab === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleExpanded(item.id);
                      if (!isActive) {
                        onTabChange(item.subItems?.[0]?.id || item.id);
                      }
                    } else {
                      onTabChange(item.id);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm font-medium",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-sidebar-foreground/70"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-sidebar-foreground/70")} />
                  <span className="flex-1">{item.label}</span>
                  {hasSubItems && (
                    <div className={cn("transition-transform duration-200", isExpanded && "rotate-90")}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </button>

                {/* Sub-items */}
                {hasSubItems && isExpanded && (
                  <div className="pl-8 pt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => onTabChange(subItem.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-all duration-200 text-sm",
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                            activeTab === subItem.id
                              ? "text-primary font-semibold"
                              : "text-sidebar-foreground/60"
                          )}
                        >
                          <span>{subItem.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 text-sm font-medium",
                  "hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
