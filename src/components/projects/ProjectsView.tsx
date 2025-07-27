import { Plus, Filter, Search, MoreHorizontal, Edit, Trash2, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      className={`p-4 bg-white transition-shadow cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div className="space-y-3">
        <h5 className="font-medium text-sm text-foreground line-clamp-2">
          {project.name}
        </h5>
        
        <div className="flex items-center gap-2">
          <Badge className={`${getPriorityColor(project.priority)} text-xs`}>
            {project.priority}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Progresso</span>
            <span className="text-xs font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-gradient-button h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{project.client}</span>
          <span className="text-muted-foreground">{project.dueDate}</span>
        </div>
        
        <div className="flex -space-x-1">
          {project.team.slice(0, 3).map((member, idx) => (
            <div 
              key={idx}
              className="w-6 h-6 rounded-full bg-gradient-button flex items-center justify-center text-white text-xs font-medium border-2 border-white"
              title={member}
            >
              {member.charAt(0)}
            </div>
          ))}
          {project.team.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
              +{project.team.length - 3}
            </div>
          )}
        </div>
      </div>
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
          <div>
            <h1 className="text-2xl font-bold text-foreground">Quadros de Projetos</h1>
            <p className="text-muted-foreground">Organize seus projetos em quadros como no Trello Pro</p>
          </div>
          <Button 
            className="bg-gradient-button hover:opacity-90 text-white border-0"
            onClick={() => setShowNewBoardForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Quadro
          </Button>
        </div>

        {/* New Board Form */}
        {showNewBoardForm && (
          <Card className="p-6 border-2 border-dashed border-gray-300">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Nome do quadro..."
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && createNewBoard()}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Escolha uma cor:</label>
                <div className="flex flex-wrap gap-2">
                  {boardColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setNewBoardColor(color)}
                      className={`w-12 h-8 rounded-md ${color} border-2 transition-all ${
                        newBoardColor === color 
                          ? 'border-foreground scale-110' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button onClick={createNewBoard} size="sm" className="bg-gradient-button text-white">
                  Criar
                </Button>
                <Button 
                  onClick={() => {
                    setShowNewBoardForm(false);
                    setNewBoardName("");
                    setNewBoardColor("bg-gradient-to-br from-blue-500 to-purple-600");
                  }} 
                  variant="outline" 
                  size="sm"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Boards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card 
              key={board.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
              onClick={() => openBoard(board)}
            >
              <div className={`h-20 ${board.color} relative`}>
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-foreground">{board.name}</h3>
                  <p className="text-sm text-muted-foreground">{board.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {board.projects.length} projeto{board.projects.length !== 1 ? 's' : ''}
                  </div>
                  <div className="flex -space-x-2">
                    {board.projects.slice(0, 3).map((project, idx) => (
                      <div 
                        key={idx}
                        className="w-8 h-8 rounded-full bg-gradient-button flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                      >
                        {project.name.charAt(0)}
                      </div>
                    ))}
                    {board.projects.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                        +{board.projects.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
            variant="ghost" 
            onClick={() => setCurrentView('boards')}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedBoard?.name}</h1>
            <p className="text-muted-foreground">{selectedBoard?.description}</p>
          </div>
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

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto pb-4">
          {selectedBoard?.columns.map((column) => (
            <div
              key={column}
              id={column}
              className="bg-gray-50 rounded-lg p-4 min-w-[280px] max-w-[280px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                {editingColumn === column ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={editingColumnValue}
                      onChange={(e) => setEditingColumnValue(e.target.value)}
                      className="text-sm font-medium h-8"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') saveColumnEdit();
                        if (e.key === 'Escape') cancelColumnEdit();
                      }}
                      autoFocus
                    />
                    <Button size="sm" variant="ghost" onClick={saveColumnEdit}>
                      ✓
                    </Button>
                    <Button size="sm" variant="ghost" onClick={cancelColumnEdit}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h4 
                      className="font-medium text-sm text-foreground cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                      onClick={() => startEditingColumn(column)}
                    >
                      {column}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {getProjectsByStatus(column).length}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteColumn(column)}
                        className="w-6 h-6 p-0 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Droppable Area */}
              <div
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
                  className="w-full justify-center text-muted-foreground hover:text-foreground border-2 border-dashed border-gray-300 hover:border-gray-400 h-auto py-3"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar projeto
                </Button>
              </div>
            </div>
          ))}

          {/* Add New Column */}
          <div className="min-w-[280px] max-w-[280px]">
            {showNewColumnForm ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
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
                    <Button size="sm" onClick={addNewColumn} className="bg-gradient-button text-white">
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
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={() => setShowNewColumnForm(true)}
                className="w-full justify-center text-muted-foreground hover:text-foreground border-2 border-dashed border-gray-300 hover:border-gray-400 h-auto py-4"
              >
                <Plus className="w-4 h-4 mr-2" />
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