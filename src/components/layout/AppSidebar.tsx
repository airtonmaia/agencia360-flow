import { LayoutDashboard, Users, FolderKanban, CreditCard, Clock, Settings, HelpCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AppSidebarProps {
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

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { state } = useSidebar();
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
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex flex-col gap-2 py-2 px-1">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <LayoutDashboard className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Agência360°</span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isExpanded = expandedItems.includes(item.id);
                const isActive = item.id === 'financial' ? shouldHighlightFinancial() : activeTab === item.id;

                return (
                  <SidebarMenuItem key={item.id}>
                    {hasSubItems ? (
                      <Collapsible
                        open={isExpanded}
                        onOpenChange={() => toggleExpanded(item.id)}
                        className="group/collapsible"
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            onClick={() => {
                              if (!isActive) {
                                onTabChange(item.subItems?.[0]?.id || item.id);
                              }
                            }}
                            className={cn(
                              isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            )}
                          >
                            <Icon />
                            <span>{item.label}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton
                                  onClick={() => onTabChange(subItem.id)}
                                  className={cn(
                                    activeTab === subItem.id && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                  )}
                                >
                                  <span>{subItem.label}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        onClick={() => onTabChange(item.id)}
                        className={cn(
                          isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        )}
                      >
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onTabChange(item.id)}
                      className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}