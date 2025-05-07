import { useState, useEffect, useRef } from 'react';
import { PlusCircle, Trash2, Edit, Save, X, ChevronRight, ChevronDown, ArrowUp, ArrowDown, Calendar, Flag, CheckCircle2, Clock, Upload, Download, Target, ListTodo, FileJson, Plus, Sparkles } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Paleta de colores moderna y formal con tema más claro
const colors = {
  primary: '#6366f1', // Indigo
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  secondary: '#0ea5e9', // Sky
  secondaryLight: '#38bdf8',
  secondaryDark: '#0284c7',
  success: '#10b981', // Emerald
  successLight: '#34d399',
  successDark: '#059669',
  danger: '#ef4444', // Red
  dangerLight: '#f87171',
  dangerDark: '#dc2626',
  warning: '#f59e0b', // Amber
  warningLight: '#fbbf24',
  warningDark: '#d97706',
  dark: '#1e293b', // Slate 800
  darkLight: '#334155', // Slate 700
  darkLighter: '#475569', // Slate 600
  gray: '#64748b', // Slate 500
  grayLight: '#94a3b8', // Slate 400
  grayLighter: '#cbd5e1', // Slate 300
  white: '#f8fafc', // Slate 50
  black: '#020617', // Slate 950
  background: '#f1f5f9', // Slate 100
  card: '#ffffff',
  text: '#1e293b', // Slate 800
  textSecondary: '#64748b', // Slate 500
  border: '#e2e8f0', // Slate 200
  shadow: 'rgba(0, 0, 0, 0.1)',
  task: '#7c3aed', // Violet
  taskLight: '#a78bfa',
  taskDark: '#5b21b6'
};

// Frases motivacionales
const frasesMotivacionales = [
  "EL ÉXITO ES LA SUMA DE PEQUEÑOS ESFUERZOS REPETIDOS DÍA TRAS DÍA.",
  "CADA META ALCANZADA ES UN NUEVO COMIENZO.",
  "LA DISCIPLINA ES EL PUENTE ENTRE LAS METAS Y LOS LOGROS.",
  "EL FUTURO PERTENECE A QUIENES CREEN EN LA BELLEZA DE SUS SUEÑOS.",
  "NO HAY LÍMITES PARA LO QUE PUEDES LOGRAR.",
  "CADA DÍA ES UNA NUEVA OPORTUNIDAD PARA SER MEJOR.",
  "LA CONSTANCIA ES LA CLAVE DEL ÉXITO.",
  "TUS METAS SON EL MAPA DE TU DESTINO.",
  "LA EXCELENCIA NO ES UN ACTO, SINO UN HÁBITO.",
  "EL CAMINO HACIA EL ÉXITO ESTÁ LLENO DE OBSTÁCULOS, PERO CADA UNO TE HACE MÁS FUERTE.",
  "LA DIFERENCIA ENTRE LO IMPOSIBLE Y LO POSIBLE ESTÁ EN TU DETERMINACIÓN.",
  "CADA LOGRO COMIENZA CON LA DECISIÓN DE INTENTARLO.",
  "EL TIEMPO ES TU RECURSO MÁS VALIOSO, ÚSALO SABIAMENTE.",
  "LA MOTIVACIÓN TE LLEVA A EMPEZAR, EL HÁBITO TE MANTIENE EN MOVIMIENTO.",
  "TUS ACTITUDES DETERMINAN TU ALTITUD."
];

// Estilos CSS en línea para la aplicación
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px 24px 24px',
    backgroundColor: colors.background,
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: colors.text,
    paddingTop: '280px'
  },
  headerContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: colors.dark,
    padding: '8px 24px',
    boxShadow: '0 4px 6px rgba(255, 4, 4, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    overflow: 'visible',
    zIndex: 1000,
    height: '120px'
  },
  headerIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px', // Aumentado para el nuevo icono
    height: '120px', // Aumentado para el nuevo icono
    flexShrink: 0,
    zIndex: 2
  },
  headerIconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  },
  headerText: {
    flex: 1,
    color: colors.white,
    fontSize: '17px',
    fontWeight: 'bold',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    paddingRight: '16px',
    lineHeight: '1.2'
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '270px',
    height: '135px',
    objectFit: 'cover',
    objectPosition: 'center',
    opacity: 0,
    transition: 'opacity 2s ease-in-out',
    zIndex: 1,
    borderRadius: '0 12px 12px 0',
    filter: 'brightness(0.9)',
    maskImage: 'linear-gradient(to right, transparent, black 20%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%)',
    margin: 0,
    padding: 0
  },
  fadeEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '300px',
    bottom: 0,
    background: 'linear-gradient(to right, rgba(30, 41, 59, 1) 0%, rgba(30, 41, 59, 0.95) 40%, rgba(30, 41, 59, 0.85) 100%)',
    zIndex: 1,
    height: '120px'
  },
  header: {
    marginTop: '0',
    marginBottom: '8px',
    textAlign: 'center'
  },
  title: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: '4px',
    letterSpacing: '-0.025em',
    lineHeight: '1.3'
  },
  imageContainer: {
    position: 'relative',
    width: '200px',
    height: '100px',
    marginLeft: '20px',
    overflow: 'hidden',
    
  },
  mainContent: {
    marginTop: '0px',
    position: 'relative',
    zIndex: 1
  },
  subtitle: {
    display: 'none'
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    marginBottom: '24px',
    border: `1px solid ${colors.border}`
  },
  filtersContainer: {
    position: 'fixed',
    top: '120px',
    left: 0,
    right: 0,
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: colors.background,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 999,
    flexWrap: 'wrap'
  },
  inputContainer: {
    position: 'fixed',
    top: '225px',
    left: 0,
    right: 0,
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: colors.background,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 998,
    flexWrap: 'wrap'
  },
  input: {
    flex: 1,
    minWidth: '200px',
    padding: '12px 16px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    backgroundColor: colors.white,
    color: colors.text,
    '&::placeholder': {
      color: colors.grayLight
    }
  },
  select: {
    padding: '12px 16px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: colors.darkLight,
    color: colors.white,
    cursor: 'pointer',
    minWidth: '150px'
  },
  datePicker: {
    padding: '12px 16px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: colors.white,
    color: colors.text,
    cursor: 'pointer',
    minWidth: '150px'
  },
  addButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: colors.primaryDark
    }
  },
  addItemButton: {
    backgroundColor: 'transparent',
    color: colors.primary,
    padding: '4px 8px',
    border: `1px solid ${colors.primary}`,
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: `${colors.primary}20`
    }
  },
  listContainer: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    width: '100%'
  },
  listItem: {
    marginBottom: '10px'
  },
  nestedListItem: {
    marginBottom: '10px',
    borderLeft: `2px solid ${colors.grayLight}`,
    paddingLeft: '12px',
    marginLeft: '12px'
  },
  itemCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: '8px',
    padding: '14px 16px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.2s ease',
    border: `1px solid ${colors.grayLight}`,
    cursor: 'pointer',
    position: 'relative'
  },
  selectedItemCard: {
    backgroundColor: colors.grayLighter,
    borderColor: colors.primary,
    boxShadow: `0 0 0 1px ${colors.primaryLight}, 0 2px 10px rgba(99, 102, 241, 0.1)`
  },
  taskCard: {
    backgroundColor: `${colors.taskLight}20`,
    borderColor: colors.task,
    boxShadow: `0 2px 6px ${colors.taskLight}30`,
    '&:hover': {
      backgroundColor: `${colors.taskLight}25`,
      boxShadow: `0 4px 8px ${colors.taskLight}40`
    }
  },
  selectedTaskCard: {
    backgroundColor: `${colors.taskLight}30`,
    borderColor: colors.taskDark,
    boxShadow: `0 0 0 1px ${colors.taskDark}, 0 2px 10px ${colors.taskLight}40`
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    gap: '12px'
  },
  itemText: {
    flex: 1,
    color: colors.text,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px'
  },
  priorityBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  priorityHigh: {
    backgroundColor: `${colors.dangerLight}20`,
    color: colors.dangerDark
  },
  priorityMedium: {
    backgroundColor: `${colors.warningLight}20`,
    color: colors.warningDark
  },
  priorityLow: {
    backgroundColor: `${colors.secondaryLight}20`,
    color: colors.secondaryDark
  },
  dateBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    backgroundColor: `${colors.primaryLight}20`,
    color: colors.primaryDark,
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  statusPending: {
    backgroundColor: `${colors.warningLight}20`,
    color: colors.warningDark
  },
  statusCompleted: {
    backgroundColor: `${colors.secondaryLight}20`,
    color: colors.secondaryDark
  },
  statusOverdue: {
    backgroundColor: `${colors.dangerLight}20`,
    color: colors.dangerDark
  },
  actionsContainer: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center'
  },
  actionButton: {
    padding: '6px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
    width: '30px',
    height: '30px',
    '&:hover': {
      backgroundColor: colors.grayLighter
    }
  },
  filterButton: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: colors.darkLighter,
    color: colors.white,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: colors.darkLight
    }
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    color: colors.white,
    '&:hover': {
      backgroundColor: colors.primaryDark
    }
  },
  typeBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  progressBar: {
    width: '150px',
    height: '8px',
    backgroundColor: colors.grayLighter,
    borderRadius: '4px',
    marginTop: '8px',
    overflow: 'hidden',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  },
  progressText: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: colors.text,
    marginTop: '4px',
    textAlign: 'right'
  },
  emptyMessage: {
    textAlign: 'center',
    padding: '24px',
    color: colors.textSecondary
  },
  addMetaButton: {
    backgroundColor: colors.success,
    color: colors.white,
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: colors.successDark
    }
  }
};

function TaskManager() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('task-manager-items');
    return savedItems ? JSON.parse(savedItems) : [
      { 
        id: 1, 
        type: 'meta',
        text: 'Proyecto Principal', 
        priority: 'high',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: 'pending',
        children: [
          { 
            id: 2, 
            type: 'objetivo',
            text: 'Investigación de mercado', 
            priority: 'medium',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            status: 'pending',
            children: [
              {
                id: 4,
                type: 'tarea',
                text: 'Analizar competencia',
                priority: 'high',
                dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                status: 'pending',
                children: []
              }
            ] 
          },
          { 
            id: 3, 
            type: 'objetivo',
            text: 'Desarrollo del prototipo', 
            priority: 'high',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            status: 'pending',
            children: [
              {
                id: 5,
                type: 'tarea',
                text: 'Diseñar interfaz',
                priority: 'medium',
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                status: 'pending',
                children: []
              }
            ] 
          }
        ] 
      }
    ];
  });
  
  const [nextId, setNextId] = useState(() => {
    let maxId = 0;
    const findMaxId = (items) => {
      items.forEach(item => {
        maxId = Math.max(maxId, item.id);
        if (item.children && item.children.length > 0) {
          findMaxId(item.children);
        }
      });
    };
    findMaxId(items);
    return maxId + 1;
  });
  
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [newItemText, setNewItemText] = useState('');
  const [newItemPriority, setNewItemPriority] = useState('medium');
  const [newItemDueDate, setNewItemDueDate] = useState(new Date());
  const [newItemParentId, setNewItemParentId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fileInputRef = useRef(null);

  const [showAddMetaModal, setShowAddMetaModal] = useState(false);
  const metaFileInputRef = useRef(null);

  const [fraseActual, setFraseActual] = useState(0);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['img-1.png', 'img-2.png', 'img-3.png'];

  useEffect(() => {
    localStorage.setItem('task-manager-items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const expandedState = {};
    const initExpanded = (items) => {
      items.forEach(item => {
        expandedState[item.id] = true;
        if (item.children && item.children.length > 0) {
          initExpanded(item.children);
        }
      });
    };
    initExpanded(items);
    setExpandedItems(expandedState);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFraseActual((prev) => (prev + 1) % frasesMotivacionales.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (item) => {
    if (item.status === 'completed') return 'completed';
    if (new Date(item.dueDate) < new Date()) return 'overdue';
    return 'pending';
  };

  const toggleExpand = (id, event) => {
    if (event) event.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleItemClick = (item, event) => {
    if (event) event.stopPropagation();
    setSelectedItem(item.id);
    if (editingItem) {
      setEditingItem(null);
    }
  };

  const startEditing = (item, event) => {
    if (event) event.stopPropagation();
    setSelectedItem(item.id);
    setEditingItem({
      id: item.id,
      text: item.text,
      priority: item.priority,
      dueDate: new Date(item.dueDate),
      status: item.status,
      type: item.type
    });
  };

  const saveEdit = (event) => {
    if (event) event.stopPropagation();
    if (!editingItem) return;
    
    const updateItem = (items) => {
      return items.map(item => {
        if (item.id === editingItem.id && item.type === editingItem.type) {
          return {
            ...item,
            text: editingItem.text,
            priority: editingItem.priority,
            dueDate: editingItem.dueDate,
            status: editingItem.status
          };
        }
        if (item.children && item.children.length > 0) {
          return {...item, children: updateItem(item.children)};
        }
        return item;
      });
    };
    
    setItems(updateItem(items));
    setEditingItem(null);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          // Asegurarse de que las fechas se conviertan correctamente
          const processDates = (items) => {
            return items.map(item => ({
              ...item,
              dueDate: new Date(item.dueDate),
              children: item.children ? processDates(item.children) : []
            }));
          };
          const processedData = processDates(importedData);
          setItems(processedData);
          localStorage.setItem('task-manager-items', JSON.stringify(processedData));
        } catch (error) {
          alert('Error al importar el archivo. Asegúrate de que sea un JSON válido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'metas-objetivos-tareas.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const calculateProgress = (item) => {
    if (!item.children || item.children.length === 0) {
      return item.status === 'completed' ? 100 : 0;
    }

    const completedChildren = item.children.reduce((acc, child) => {
      const childProgress = calculateProgress(child);
      return acc + childProgress;
    }, 0);

    const progress = Math.round(completedChildren / item.children.length);
    
    // Actualizar automáticamente el estado si el progreso es 100%
    if (progress === 100 && item.status !== 'completed') {
      const updateStatus = (items) => {
        return items.map(i => {
          if (i.id === item.id) {
            return { ...i, status: 'completed' };
          }
          if (i.children && i.children.length > 0) {
            return { ...i, children: updateStatus(i.children) };
          }
          return i;
        });
      };
      setItems(updateStatus(items));
    }
    
    return progress;
  };

  const renderProgressBar = (item) => {
    if (item.type === 'tarea') return null;
    
    const progress = calculateProgress(item);
    const progressColor = progress === 100 ? colors.success : 
                         progress >= 70 ? colors.secondary :
                         progress >= 40 ? colors.warning :
                         colors.danger;

    return (
      <div style={{width: '150px'}}>
        <div style={styles.progressBar}>
          <div style={{
            ...styles.progressFill,
            width: `${progress}%`,
            backgroundColor: progressColor
          }} />
        </div>
        <div style={styles.progressText}>
          {progress}% Completado
        </div>
      </div>
    );
  };

  const addNewItem = (parentId = null, type = 'meta', event) => {
    if (event) event.stopPropagation();
    
    if (!newItemText.trim()) return;
    
    const newItem = {
      id: nextId,
      type: type,
      text: newItemText,
      priority: newItemPriority,
      dueDate: newItemDueDate,
      status: 'pending',
      children: []
    };
    
    setNextId(nextId + 1);
    
    if (parentId === null) {
      setItems([...items, newItem]);
    } else {
      const addChildToParent = (items) => {
        return items.map(item => {
          if (item.id === parentId) {
            if (item.type === 'tarea') {
              return item;
            }
            return {
              ...item,
              children: [...item.children, newItem]
            };
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: addChildToParent(item.children)
            };
          }
          return item;
        });
      };
      
      setItems(addChildToParent(items));
    }
    
    setNewItemText('');
    setNewItemPriority('medium');
    setNewItemDueDate(new Date());
    setNewItemParentId(null);
  };

  const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children && item.children.length > 0) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const deleteItem = (itemId, itemType, event) => {
    if (event) event.stopPropagation();
    
    const deleteItemById = (items) => {
      const filteredItems = items.filter(item => !(item.id === itemId && item.type === itemType));
      return filteredItems.map(item => {
        if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: deleteItemById(item.children)
          };
        }
        return item;
      });
    };
    
    setItems(deleteItemById(items));
    setSelectedItem(null);
  };

  const toggleStatus = (itemId, itemType, event) => {
    if (event) event.stopPropagation();
    
    const updateStatus = (items) => {
      return items.map(item => {
        if (item.id === itemId && item.type === itemType) {
          return {
            ...item,
            status: item.status === 'completed' ? 'pending' : 'completed'
          };
        }
        if (item.children && item.children.length > 0) {
          return {
            ...item,
            children: updateStatus(item.children)
          };
        }
        return item;
      });
    };
    
    setItems(updateStatus(items));
  };

  const filterItems = (items) => {
    return items.filter(item => {
      const matchesFilter = 
        activeFilter === 'all' ||
        (activeFilter === 'pending' && getStatus(item) === 'pending') ||
        (activeFilter === 'completed' && getStatus(item) === 'completed') ||
        (activeFilter === 'overdue' && getStatus(item) === 'overdue') ||
        (activeFilter === 'high' && item.priority === 'high') ||
        (activeFilter === 'medium' && item.priority === 'medium') ||
        (activeFilter === 'low' && item.priority === 'low');

      const matchesSearch = 
        item.text.toLowerCase().includes(searchQuery.toLowerCase());

      const childrenMatch = item.children && item.children.length > 0
        ? filterItems(item.children).length > 0
        : false;

      return (matchesFilter && matchesSearch) || childrenMatch;
    });
  };

  const renderPriorityBadge = (priority) => {
    const priorityStyles = {
      high: styles.priorityHigh,
      medium: styles.priorityMedium,
      low: styles.priorityLow
    };

    const priorityIcons = {
      high: <Flag size={12} />,
      medium: <Flag size={12} />,
      low: <Flag size={12} />
    };

    return (
      <span style={{...styles.priorityBadge, ...priorityStyles[priority]}}>
        {priorityIcons[priority]}
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const renderDateBadge = (date) => {
    return (
      <span style={styles.dateBadge}>
        <Calendar size={12} />
        {new Date(date).toLocaleDateString()}
      </span>
    );
  };

  const renderStatusBadge = (item) => {
    const status = getStatus(item);
    const statusStyles = {
      pending: styles.statusPending,
      completed: styles.statusCompleted,
      overdue: styles.statusOverdue
    };

    const statusIcons = {
      pending: <Clock size={12} />,
      completed: <CheckCircle2 size={12} />,
      overdue: <Clock size={12} />
    };

    const statusText = {
      pending: 'Pendiente',
      completed: 'Completado',
      overdue: 'Vencido'
    };

    return (
      <span style={{...styles.statusBadge, ...statusStyles[status]}}>
        {statusIcons[status]}
        {statusText[status]}
      </span>
    );
  };

  const renderTypeBadge = (type) => {
    const typeStyles = {
      meta: {
        backgroundColor: `${colors.primaryLight}20`,
        color: colors.primaryDark
      },
      objetivo: {
        backgroundColor: `${colors.secondaryLight}20`,
        color: colors.secondaryDark
      },
      tarea: {
        backgroundColor: `${colors.taskLight}30`,
        color: colors.taskDark,
        fontWeight: 'bold'
      }
    };

    const typeIcons = {
      meta: <Target size={12} />,
      objetivo: <ListTodo size={12} />,
      tarea: <CheckCircle2 size={12} />
    };

    const typeText = {
      meta: 'Meta',
      objetivo: 'Objetivo',
      tarea: 'Tarea'
    };

    return (
      <span style={{...styles.typeBadge, ...typeStyles[type]}}>
        {typeIcons[type]}
        {typeText[type]}
      </span>
    );
  };

  const renderItems = (items, level = 0) => {
    const filteredItems = filterItems(items);
    
    return (
      <ul style={level > 0 ? styles.nestedList : styles.listContainer}>
        {filteredItems.map(item => (
          <li key={`${item.id}-${item.type}`} style={level > 0 ? styles.nestedListItem : styles.listItem}>
            <div 
              style={{
                ...styles.itemCard,
                ...(item.type === 'tarea' ? styles.taskCard : {}),
                ...(selectedItem === item.id ? 
                  (item.type === 'tarea' ? styles.selectedTaskCard : styles.selectedItemCard) 
                  : {})
              }}
              onClick={(e) => handleItemClick(item, e)}
            >
              <div style={styles.contentContainer}>
                {item.children && item.children.length > 0 ? (
                  <button 
                    onClick={(e) => toggleExpand(item.id, e)}
                    style={styles.actionButton}
                  >
                    {expandedItems[item.id] ? 
                      <ChevronDown size={16} /> : 
                      <ChevronRight size={16} />
                    }
                  </button>
                ) : (
                  <div style={{width: '24px'}}></div>
                )}
                
                {editingItem && editingItem.id === item.id && editingItem.type === item.type ? (
                  <div style={{display: 'flex', gap: '12px', flex: 1}}>
                    <input
                      type="text"
                      value={editingItem.text}
                      onChange={(e) => setEditingItem({...editingItem, text: e.target.value})}
                      style={styles.input}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <select
                      value={editingItem.priority}
                      onChange={(e) => setEditingItem({...editingItem, priority: e.target.value})}
                      style={styles.select}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                    <DatePicker
                      selected={editingItem.dueDate}
                      onChange={(date) => setEditingItem({...editingItem, dueDate: date})}
                      style={styles.datePicker}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ) : (
                  <>
                    <span style={styles.itemText}>{item.text}</span>
                    {renderPriorityBadge(item.priority)}
                    {renderDateBadge(item.dueDate)}
                    {renderStatusBadge(item)}
                    {renderTypeBadge(item.type)}
                    {renderProgressBar(item)}
                  </>
                )}
              </div>

              <div style={styles.actionsContainer}>
                {editingItem && editingItem.id === item.id && editingItem.type === item.type ? (
                  <>
                    <button 
                      onClick={(e) => saveEdit(e)}
                      style={styles.actionButton}
                    >
                      <Save size={16} />
                    </button>
                    <button 
                      onClick={(e) => setEditingItem(null)}
                      style={styles.actionButton}
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    {item.type === 'tarea' && (
                      <button 
                        onClick={(e) => toggleStatus(item.id, item.type, e)}
                        style={styles.actionButton}
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    <button 
                      onClick={(e) => moveItem(item.id, item.type, 'up', e)}
                      style={styles.actionButton}
                      title="Mover arriba"
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button 
                      onClick={(e) => moveItem(item.id, item.type, 'down', e)}
                      style={styles.actionButton}
                      title="Mover abajo"
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button 
                      onClick={(e) => startEditing(item, e)}
                      style={styles.actionButton}
                    >
                      <Edit size={16} />
                    </button>
                    {item.type === 'meta' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewItemParentId(item.id);
                          setNewItemText('');
                          setNewItemPriority('medium');
                          setNewItemDueDate(new Date());
                        }}
                        style={styles.addItemButton}
                      >
                        <Plus size={14} /> Objetivo
                      </button>
                    )}
                    {item.type === 'objetivo' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setNewItemParentId(item.id);
                          setNewItemText('');
                          setNewItemPriority('medium');
                          setNewItemDueDate(new Date());
                        }}
                        style={styles.addItemButton}
                      >
                        <Plus size={14} /> Tarea
                      </button>
                    )}
                    <button 
                      onClick={(e) => deleteItem(item.id, item.type, e)}
                      style={styles.actionButton}
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {item.children && item.children.length > 0 && expandedItems[item.id] && (
              renderItems(item.children, level + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  const handleMetaFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const metaData = JSON.parse(e.target.result);
          if (!metaData.meta || !metaData.objetivos) {
            throw new Error('Formato de archivo inválido');
          }

          const metaId = nextId;
          const objetivoId = nextId + 1;
          const tareaId = nextId + 2;

          const newMeta = {
            id: metaId,
            type: 'meta',
            text: metaData.meta.text,
            priority: metaData.meta.priority || 'medium',
            dueDate: new Date(metaData.meta.dueDate || Date.now() + 7 * 24 * 60 * 60 * 1000),
            status: 'pending',
            children: metaData.objetivos.map((objetivo, index) => ({
              id: objetivoId + index,
              type: 'objetivo',
              text: objetivo.text,
              priority: objetivo.priority || 'medium',
              dueDate: new Date(objetivo.dueDate || Date.now() + 5 * 24 * 60 * 60 * 1000),
              status: 'pending',
              children: objetivo.tareas.map((tarea, tareaIndex) => ({
                id: tareaId + (index * 10) + tareaIndex,
                type: 'tarea',
                text: tarea.text,
                priority: tarea.priority || 'medium',
                dueDate: new Date(tarea.dueDate || Date.now() + 3 * 24 * 60 * 60 * 1000),
                status: 'pending',
                children: []
              }))
            }))
          };

          setItems([...items, newMeta]);
          setNextId(tareaId + (metaData.objetivos.length * 10) + metaData.objetivos[0].tareas.length);
          setShowAddMetaModal(false);
        } catch (error) {
          alert('Error al procesar el archivo. Asegúrate de que tenga el formato correcto.');
        }
      };
      reader.readAsText(file);
    }
  };

  const renderAddMetaModal = () => {
    if (!showAddMetaModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: colors.card,
          borderRadius: '12px',
          padding: '24px',
          width: '90%',
          maxWidth: '600px',
          border: `1px solid ${colors.border}`
        }}>
          <h2 style={{marginBottom: '20px', color: colors.white}}>Añadir Meta desde Archivo</h2>
          
          <div style={{marginBottom: '24px'}}>
            <p style={{color: colors.textSecondary, marginBottom: '16px'}}>
              Selecciona un archivo JSON con el siguiente formato:
            </p>
            <pre style={{
              backgroundColor: colors.darkLight,
              padding: '16px',
              borderRadius: '8px',
              color: colors.grayLight,
              fontSize: '12px',
              overflowX: 'auto',
              marginBottom: '16px'
            }}>
{`{
  "meta": {
    "text": "Nombre de la meta",
    "priority": "high",
    "dueDate": "2024-03-20T00:00:00.000Z"
  },
  "objetivos": [
    {
      "text": "Nombre del objetivo",
      "priority": "medium",
      "dueDate": "2024-03-15T00:00:00.000Z",
      "tareas": [
        {
          "text": "Nombre de la tarea",
          "priority": "low",
          "dueDate": "2024-03-10T00:00:00.000Z"
        }
      ]
    }
  ]
}`}
            </pre>
          </div>

          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
            <button
              onClick={() => setShowAddMetaModal(false)}
              style={{
                ...styles.filterButton,
                backgroundColor: colors.gray,
                color: colors.white
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() => metaFileInputRef.current.click()}
              style={{
                ...styles.filterButton,
                backgroundColor: colors.primary,
                color: colors.white
              }}
            >
              <Upload size={16} style={{marginRight: '4px'}} /> Seleccionar Archivo
            </button>
            <input
              type="file"
              accept=".json"
              onChange={handleMetaFileSelect}
              style={{display: 'none'}}
              ref={metaFileInputRef}
            />
          </div>
        </div>
      </div>
    );
  };

  const moveItem = (itemId, itemType, direction, event) => {
    if (event) event.stopPropagation();
    
    const moveItemInArray = (items) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId && items[i].type === itemType) {
          if (direction === 'up' && i > 0) {
            [items[i], items[i - 1]] = [items[i - 1], items[i]];
            return true;
          } else if (direction === 'down' && i < items.length - 1) {
            [items[i], items[i + 1]] = [items[i + 1], items[i]];
            return true;
          }
          return false;
        }
        if (items[i].children && items[i].children.length > 0) {
          if (moveItemInArray(items[i].children)) {
            return true;
          }
        }
      }
      return false;
    };
    
    const newItems = [...items];
    if (moveItemInArray(newItems)) {
      setItems(newItems);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <div style={styles.headerIcon}>
          <img 
            src={require('./icono/icono1.png')} 
            alt="Icono" 
            style={styles.headerIconImage}
          />
        </div>
        <div style={styles.headerText}>
          {frasesMotivacionales[fraseActual]}
        </div>
        {images.map((image, index) => (
          <img
            key={image}
            src={require(`./images/${image}`)}
            alt={`Header ${index + 1}`}
            style={{
              ...styles.headerImage,
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        <div style={styles.fadeEdge} />
      </div>

      <div style={styles.header}>
        <h1 style={styles.title}>GESTOR DE METAS OBJETIVOS Y TAREAS - Organiza tus metas, objetivos y tareas de manera eficiente</h1>
      </div>
      <div style={styles.mainContent}>
        <div style={styles.card}>
          <div style={styles.filtersContainer}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.input}
            />
            <button
              style={{
                ...styles.filterButton,
                ...(activeFilter === 'all' ? styles.filterButtonActive : {})
              }}
              onClick={() => setActiveFilter('all')}
            >
              Todas
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(activeFilter === 'pending' ? styles.filterButtonActive : {})
              }}
              onClick={() => setActiveFilter('pending')}
            >
              Pendientes
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(activeFilter === 'completed' ? styles.filterButtonActive : {})
              }}
              onClick={() => setActiveFilter('completed')}
            >
              Completadas
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(activeFilter === 'overdue' ? styles.filterButtonActive : {})
              }}
              onClick={() => setActiveFilter('overdue')}
            >
              Vencidas
            </button>
            <div style={{display: 'flex', gap: '8px', marginLeft: 'auto'}}>
              <button
                onClick={() => {
                  setNewItemParentId(null);
                  setNewItemText('');
                  setNewItemPriority('medium');
                  setNewItemDueDate(new Date());
                }}
                style={styles.addMetaButton}
              >
                <PlusCircle size={16} style={{marginRight: '4px'}} /> Nueva Meta
              </button>
              <button
                onClick={() => setShowAddMetaModal(true)}
                style={{
                  ...styles.filterButton,
                  backgroundColor: colors.secondary,
                  color: colors.white
                }}
              >
                <FileJson size={16} style={{marginRight: '4px'}} /> Importar Meta
              </button>
              <input
                type="file"
                accept=".json"
                onChange={handleMetaFileSelect}
                style={{display: 'none'}}
                ref={metaFileInputRef}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                style={{
                  ...styles.filterButton,
                  backgroundColor: colors.secondary,
                  color: colors.white
                }}
              >
                <Upload size={16} style={{marginRight: '4px'}} /> Importar Todo
              </button>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{display: 'none'}}
                ref={fileInputRef}
              />
              <button
                onClick={handleExport}
                style={{
                  ...styles.filterButton,
                  backgroundColor: colors.primary,
                  color: colors.white
                }}
              >
                <Download size={16} style={{marginRight: '4px'}} /> Exportar Todo
              </button>
            </div>
          </div>

          {newItemParentId === null && (
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Nueva meta"
                style={styles.input}
              />
              <select
                value={newItemPriority}
                onChange={(e) => setNewItemPriority(e.target.value)}
                style={styles.select}
              >
                <option value="high">Alta prioridad</option>
                <option value="medium">Media prioridad</option>
                <option value="low">Baja prioridad</option>
              </select>
              <DatePicker
                selected={newItemDueDate}
                onChange={(date) => setNewItemDueDate(date)}
                style={styles.datePicker}
              />
              <button
                onClick={() => addNewItem(null, 'meta')}
                style={styles.addButton}
              >
                <PlusCircle size={16} style={{marginRight: '4px'}} /> Añadir Meta
              </button>
              <button
                onClick={() => setNewItemParentId(undefined)}
                style={{
                  ...styles.filterButton,
                  backgroundColor: colors.danger,
                  color: colors.white
                }}
              >
                Cancelar
              </button>
            </div>
          )}

          {newItemParentId && (
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder={findItemById(items, newItemParentId)?.type === 'meta' ? "Nuevo objetivo" : "Nueva tarea"}
                style={styles.input}
              />
              <select
                value={newItemPriority}
                onChange={(e) => setNewItemPriority(e.target.value)}
                style={styles.select}
              >
                <option value="high">Alta prioridad</option>
                <option value="medium">Media prioridad</option>
                <option value="low">Baja prioridad</option>
              </select>
              <DatePicker
                selected={newItemDueDate}
                onChange={(date) => setNewItemDueDate(date)}
                style={styles.datePicker}
              />
              <button
                onClick={() => addNewItem(newItemParentId, findItemById(items, newItemParentId)?.type === 'meta' ? 'objetivo' : 'tarea')}
                style={styles.addButton}
              >
                <PlusCircle size={16} style={{marginRight: '4px'}} /> Añadir
              </button>
              <button
                onClick={() => setNewItemParentId(null)}
                style={{
                  ...styles.filterButton,
                  backgroundColor: colors.danger,
                  color: colors.white
                }}
              >
                Cancelar
              </button>
            </div>
          )}
          
          {items.length > 0 ? (
            renderItems(items)
          ) : (
            <div style={styles.emptyMessage}>
              No hay metas. ¡Añade tu primera meta!
            </div>
          )}
        </div>
        {renderAddMetaModal()}
      </div>
    </div>
  );
}

export default TaskManager; 