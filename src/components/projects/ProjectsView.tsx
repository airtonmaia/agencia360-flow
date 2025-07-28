import { Plus, Filter, Search, MoreHorizontal, Edit, Trash2, ArrowLeft, X, Users, Calendar, BarChart3, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Project {
  id: number;
  name: string;
  status: string;
  priority: string;
  dueDate: string;
  progress: number;
  client: string;
  team: string[];
}

interface Board {
  id: number;
  name: string;
  description: string;
  color: string;
  projects: Project[];
  columns: string[];
}

// Componente para projeto arrastável
const DraggableProject = ({ project }: { project: Project }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging ? 'opacity-50 shadow-2xl scale-105' : 'hover:shadow-lg hover:-translate-y-1'
      } border-0 shadow-sm bg-card`}
    >
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <h5 className="font-semibold text-sm text-card-foreground line-clamp-2 leading-tight">
            {project.name}
          </h5>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={`${getPriorityColor(project.priority)} text-xs font-medium px-2 py-1`}>
              {project.priority}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1">
              {project.client}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">Progresso</span>
            </div>
            <span className="text-xs font-semibold text-primary">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{project.dueDate}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-muted-foreground" />
            <div className="flex -space-x-2">
              {project.team.slice(0, 3).map((member, idx) => (
                <Avatar key={idx} className="w-6 h-6 border-2 border-background">
                  <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                    {member.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.team.length > 3 && (
                <Avatar className="w-6 h-6 border-2 border-background">
                  <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
                    +{project.team.length - 3}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para coluna arrastável
const DraggableColumn = ({ 
  column, 
  projects, 
  editingColumn, 
  editingColumnValue, 
  setEditingColumnValue,
  startEditingColumn,
  saveColumnEdit,
  cancelColumnEdit,
  deleteColumn,
  getProjectsByStatus
}: {
  column: string;
  projects: Project[];
  editingColumn: string | null;
  editingColumnValue: string;
  setEditingColumnValue: (value: string) => void;
  startEditingColumn: (column: string) => void;
  saveColumnEdit: () => void;
  cancelColumnEdit: () => void;
  deleteColumn: (column: string) => void;
  getProjectsByStatus: (status: string) => Project[];
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`min-w-[300px] max-w-[300px] transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-105' : ''
      } bg-muted/30 border-muted`}
    >
      <CardHeader className="pb-3">
        {editingColumn === column ? (
          <div className="flex items-center gap-2">
            <Input
              value={editingColumnValue}
              onChange={(e) => setEditingColumnValue(e.target.value)}
              className="font-semibold h-8"
              onKeyPress={(e) => {
                if (e.key === 'Enter') saveColumnEdit();
                if (e.key === 'Escape') cancelColumnEdit();
              }}
              autoFocus
            />
            <Button size="sm" variant="ghost" onClick={saveColumnEdit} className="h-8 w-8 p-0">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </Button>
            <Button size="sm" variant="ghost" onClick={cancelColumnEdit} className="h-8 w-8 p-0">
              <X className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <CardTitle 
              {...attributes}
              {...listeners}
              className="text-sm font-semibold cursor-grab active:cursor-grabbing hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md transition-colors flex-1"
              onDoubleClick={() => startEditingColumn(column)}
            >
              {column}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-medium">
                {getProjectsByStatus(column).length}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColumn(column);
                }}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <div
          id={column}
          className="space-y-3 min-h-[400px]"
          style={{ minHeight: '400px' }}
        >
          <SortableContext
            items={getProjectsByStatus(column).map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {getProjectsByStatus(column).map((project) => (
              <DraggableProject key={project.id} project={project} />
            ))}
          </SortableContext>

          {/* Add new project button */}
          <Button
            variant="ghost"
            className="w-full justify-center text-muted-foreground hover:text-foreground border-2 border-dashed border-border hover:border-primary/50 h-auto py-6 rounded-lg hover:bg-accent/50 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar projeto
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProjectsView = () => {
  const [currentView, setCurrentView] = useState<'boards' | 'board'>('boards');
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      name: "Projetos Clientes",
      description: "Quadro principal para projetos de clientes externos",
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      columns: ["Backlog", "Em Progresso", "Revisão", "Concluído"],
      projects: [
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
        }
      ]
    },
    {
      id: 2,
      name: "Projetos Internos",
      description: "Desenvolvimento interno da agência",
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      columns: ["Ideias", "Desenvolvimento", "Testes", "Finalizado"],
      projects: [
        {
          id: 3,
          name: "Sistema CRM Interno",
          status: "Desenvolvimento",
          priority: "Alta",
          dueDate: "30 dias restantes",
          progress: 45,
          client: "Agência360",
          team: ["Sofia", "Lucas"]
        }
      ]
    }
  ]);

  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("bg-gradient-to-br from-blue-500 to-purple-600");
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  
  // Estados para drag and drop
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  
  // Estados para gerenciamento de colunas
  const [editingColumn, setEditingColumn] = useState<string | null>(null);
  const [editingColumnValue, setEditingColumnValue] = useState("");
  const [newColumnName, setNewColumnName] = useState("");
  const [showNewColumnForm, setShowNewColumnForm] = useState(false);
  
  const boardColors = [
    "bg-gradient-to-br from-blue-500 to-purple-600",
    "bg-gradient-to-br from-purple-500 to-pink-600", 
    "bg-gradient-to-br from-green-500 to-blue-600",
    "bg-gradient-to-br from-orange-500 to-red-600",
    "bg-gradient-to-br from-pink-500 to-rose-600",
    "bg-gradient-to-br from-indigo-500 to-purple-600",
    "bg-gradient-to-br from-emerald-500 to-teal-600",
    "bg-gradient-to-br from-amber-500 to-orange-600"
  ];

  const createNewBoard = () => {
    if (newBoardName.trim()) {
      const newBoard: Board = {
        id: boards.length + 1,
        name: newBoardName,
        description: "",
        color: newBoardColor,
        columns: ["A Fazer", "Em Progresso", "Revisão", "Concluído"],
        projects: []
      };
      setBoards([...boards, newBoard]);
      setNewBoardName("");
      setNewBoardColor("bg-gradient-to-br from-blue-500 to-purple-600");
      setShowNewBoardForm(false);
    }
  };

  const openBoard = (board: Board) => {
    setSelectedBoard(board);
    setCurrentView('board');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Progresso": return "bg-primary/20 text-primary";
      case "Desenvolvimento": return "bg-primary/20 text-primary";
      case "Revisão": return "bg-warning/20 text-warning";
      case "Testes": return "bg-warning/20 text-warning";
      case "Planejamento": return "bg-muted text-muted-foreground";
      case "Backlog": return "bg-muted text-muted-foreground";
      case "A Fazer": return "bg-muted text-muted-foreground";
      case "Ideias": return "bg-muted text-muted-foreground";
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

  const getProjectsByStatus = (status: string) => {
    if (!selectedBoard) return [];
    return selectedBoard.projects.filter(project => project.status === status);
  };

  // Funções para drag and drop
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const project = selectedBoard?.projects.find(p => p.id === active.id);
    setActiveProject(project || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveProject(null);

    if (!over || !selectedBoard) return;

    // Verificar se é uma coluna sendo arrastada
    if (selectedBoard.columns.includes(active.id as string)) {
      const activeIndex = selectedBoard.columns.indexOf(active.id as string);
      const overIndex = selectedBoard.columns.indexOf(over.id as string);

      if (activeIndex !== overIndex) {
        const reorderedColumns = arrayMove(selectedBoard.columns, activeIndex, overIndex);
        const updatedBoard = { ...selectedBoard, columns: reorderedColumns };
        
        setSelectedBoard(updatedBoard);
        
        const updatedBoards = boards.map(board =>
          board.id === selectedBoard.id ? updatedBoard : board
        );
        setBoards(updatedBoards);
      }
      return;
    }

    // Verificar se é um projeto sendo arrastado
    const activeProject = selectedBoard.projects.find(p => p.id === active.id);
    const overColumn = over.id as string;

    if (activeProject && activeProject.status !== overColumn) {
      const updatedProjects = selectedBoard.projects.map(project =>
        project.id === activeProject.id 
          ? { ...project, status: overColumn }
          : project
      );

      const updatedBoard = { ...selectedBoard, projects: updatedProjects };
      setSelectedBoard(updatedBoard);

      const updatedBoards = boards.map(board =>
        board.id === selectedBoard.id ? updatedBoard : board
      );
      setBoards(updatedBoards);
    }
  };

  // Funções para gerenciamento de colunas
  const startEditingColumn = (column: string) => {
    setEditingColumn(column);
    setEditingColumnValue(column);
  };

  const saveColumnEdit = () => {
    if (!selectedBoard || !editingColumn || !editingColumnValue.trim()) return;

    const updatedColumns = selectedBoard.columns.map(col =>
      col === editingColumn ? editingColumnValue.trim() : col
    );

    const updatedProjects = selectedBoard.projects.map(project =>
      project.status === editingColumn 
        ? { ...project, status: editingColumnValue.trim() }
        : project
    );

    const updatedBoard = { 
      ...selectedBoard, 
      columns: updatedColumns, 
      projects: updatedProjects 
    };
    
    setSelectedBoard(updatedBoard);
    
    const updatedBoards = boards.map(board =>
      board.id === selectedBoard.id ? updatedBoard : board
    );
    setBoards(updatedBoards);

    setEditingColumn(null);
    setEditingColumnValue("");
  };

  const cancelColumnEdit = () => {
    setEditingColumn(null);
    setEditingColumnValue("");
  };

  const deleteColumn = (columnToDelete: string) => {
    if (!selectedBoard) return;

    const updatedColumns = selectedBoard.columns.filter(col => col !== columnToDelete);
    const updatedProjects = selectedBoard.projects.filter(project => project.status !== columnToDelete);

    const updatedBoard = { 
      ...selectedBoard, 
      columns: updatedColumns, 
      projects: updatedProjects 
    };
    
    setSelectedBoard(updatedBoard);
    
    const updatedBoards = boards.map(board =>
      board.id === selectedBoard.id ? updatedBoard : board
    );
    setBoards(updatedBoards);
  };

  const addNewColumn = () => {
    if (!selectedBoard || !newColumnName.trim()) return;

    const updatedColumns = [...selectedBoard.columns, newColumnName.trim()];
    const updatedBoard = { ...selectedBoard, columns: updatedColumns };
    
    setSelectedBoard(updatedBoard);
    
    const updatedBoards = boards.map(board =>
      board.id === selectedBoard.id ? updatedBoard : board
    );
    setBoards(updatedBoards);

    setNewColumnName("");
    setShowNewColumnForm(false);
  };

  if (currentView === 'boards') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Quadros de Projetos</h1>
            <p className="text-muted-foreground text-lg">Organize seus projetos em quadros como no Trello Pro</p>
          </div>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg"
            onClick={() => setShowNewBoardForm(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Quadro
          </Button>
        </div>

        {/* New Board Form */}
        {showNewBoardForm && (
          <Card className="border-2 border-dashed border-primary/30 bg-accent/20">
            <CardHeader>
              <CardTitle className="text-lg">Criar Novo Quadro</CardTitle>
              <CardDescription>Configure seu novo quadro de projetos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nome do quadro</label>
                <Input
                  placeholder="Ex: Projetos Clientes, Marketing, Desenvolvimento..."
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  className="text-base"
                  onKeyPress={(e) => e.key === 'Enter' && createNewBoard()}
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Escolha uma cor</label>
                <div className="grid grid-cols-4 gap-3">
                  {boardColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setNewBoardColor(color)}
                      className={`h-12 rounded-lg ${color} border-2 transition-all duration-200 hover:scale-105 ${
                        newBoardColor === color 
                          ? 'border-foreground shadow-lg scale-105' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <Button onClick={createNewBoard} className="bg-gradient-to-r from-primary to-primary/80">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Quadro
                </Button>
                <Button 
                  onClick={() => {
                    setShowNewBoardForm(false);
                    setNewBoardName("");
                    setNewBoardColor("bg-gradient-to-br from-blue-500 to-purple-600");
                  }} 
                  variant="outline"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card 
              key={board.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:-translate-y-2"
              onClick={() => openBoard(board)}
            >
              <div className={`h-24 ${board.color} relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/20" />
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/20 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {board.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {board.description || "Sem descrição"}
                  </CardDescription>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-medium">
                      {board.projects.length} projeto{board.projects.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div className="flex -space-x-2">
                      {board.projects.slice(0, 3).map((project, idx) => (
                        <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                          <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                            {project.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {board.projects.length > 3 && (
                        <Avatar className="w-8 h-8 border-2 border-background">
                          <AvatarFallback className="text-xs font-semibold bg-muted text-muted-foreground">
                            +{board.projects.length - 3}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Board View (Kanban)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('boards')}
            className="px-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">{selectedBoard?.name}</h1>
            <p className="text-muted-foreground text-lg">{selectedBoard?.description || "Quadro de projetos"}</p>
          </div>
        </div>
        <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Novo Projeto
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-card/50 border-muted">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar projetos..."
                className="pl-10 bg-background"
              />
            </div>
            <Button variant="outline" className="hover:bg-accent">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          <SortableContext
            items={selectedBoard?.columns || []}
            strategy={horizontalListSortingStrategy}
          >
            {selectedBoard?.columns.map((column) => (
              <DraggableColumn
                key={column}
                column={column}
                projects={selectedBoard.projects}
                editingColumn={editingColumn}
                editingColumnValue={editingColumnValue}
                setEditingColumnValue={setEditingColumnValue}
                startEditingColumn={startEditingColumn}
                saveColumnEdit={saveColumnEdit}
                cancelColumnEdit={cancelColumnEdit}
                deleteColumn={deleteColumn}
                getProjectsByStatus={getProjectsByStatus}
              />
            ))}
          </SortableContext>

          {/* Add New Column */}
          <div className="min-w-[300px] max-w-[300px]">
            {showNewColumnForm ? (
              <Card className="bg-muted/30 border-muted">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Nova Coluna</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Nome da coluna..."
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') addNewColumn();
                      if (e.key === 'Escape') {
                        setShowNewColumnForm(false);
                        setNewColumnName("");
                      }
                    }}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addNewColumn} className="bg-gradient-to-r from-primary to-primary/80">
                      <Plus className="w-3 h-3 mr-1" />
                      Adicionar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowNewColumnForm(false);
                        setNewColumnName("");
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowNewColumnForm(true)}
                className="w-full h-auto py-8 justify-center text-muted-foreground hover:text-foreground border-2 border-dashed border-border hover:border-primary/50 rounded-lg hover:bg-accent/50 transition-all"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar coluna
              </Button>
            )}
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeProject ? <DraggableProject project={activeProject} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};