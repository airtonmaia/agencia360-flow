import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ProjectsView = () => {
  const projects = [
    {
      id: 1,
      name: "Website Redesign - TechCorp",
      status: "Em Progresso",
      priority: "Alta",
      dueDate: "15 dias restantes",
      progress: 60,
      client: "TechCorp",
      team: ["João", "Maria", "Pedro"]
    },
    {
      id: 2,
      name: "App Mobile - StartupXYZ",
      status: "Revisão",
      priority: "Média",
      dueDate: "8 dias restantes",
      progress: 85,
      client: "StartupXYZ",
      team: ["Ana", "Carlos"]
    },
    {
      id: 3,
      name: "Identidade Visual - Empresa ABC",
      status: "Planejamento",
      priority: "Baixa",
      dueDate: "30 dias restantes",
      progress: 20,
      client: "Empresa ABC",
      team: ["Sofia", "Lucas"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Progresso": return "bg-primary/20 text-primary";
      case "Revisão": return "bg-warning/20 text-warning";
      case "Planejamento": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-destructive/20 text-destructive";
      case "Média": return "bg-warning/20 text-warning";
      case "Baixa": return "bg-success/20 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projetos</h1>
          <p className="text-muted-foreground">Gerencie todos os seus projetos em um só lugar</p>
        </div>
        <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar projetos..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6 shadow-card hover:shadow-soft transition-shadow cursor-pointer">
            <div className="space-y-4">
              {/* Project Header */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground line-clamp-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground">Cliente: {project.client}</p>
              </div>

              {/* Status and Priority */}
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(project.status)} text-xs`}>
                  {project.status}
                </Badge>
                <Badge className={`${getPriorityColor(project.priority)} text-xs`}>
                  {project.priority}
                </Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Progresso</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Team and Due Date */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  Time: {project.team.join(", ")}
                </div>
                <div className="text-muted-foreground">
                  {project.dueDate}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Kanban Board Preview */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Visualização Kanban</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Backlog", "Em Progresso", "Revisão", "Concluído"].map((column) => (
            <div key={column} className="bg-muted rounded-lg p-4 min-h-[200px]">
              <h4 className="font-medium text-sm text-muted-foreground mb-3">{column}</h4>
              <div className="space-y-2">
                {column === "Em Progresso" && (
                  <div className="bg-card p-3 rounded-lg shadow-sm border">
                    <p className="text-sm font-medium">Design Homepage</p>
                    <p className="text-xs text-muted-foreground mt-1">TechCorp</p>
                  </div>
                )}
                {column === "Revisão" && (
                  <div className="bg-card p-3 rounded-lg shadow-sm border">
                    <p className="text-sm font-medium">App Prototype</p>
                    <p className="text-xs text-muted-foreground mt-1">StartupXYZ</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};