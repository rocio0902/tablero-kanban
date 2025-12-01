document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('kanbanBoard');
    const columns = [
        { id: 'todo', title: ' Por Hacer' },
        { id: 'doing', title: ' En Progreso' },
        { id: 'done', title: ' Terminado' }
    ];

    // Cargar tareas guardadas
let tasks = [
        // Tareas de ejemplo
        { id: 1, title: 'Configurar entorno inicial', description: 'Crear index.html y main.css', status: 'todo' },
        { id: 2, title: 'Implementar lógica Drag & Drop', description: 'Asegurar que las tarjetas se puedan mover', status: 'doing' },
        { id: 3, title: 'Definir Convencional Commits', description: 'Crear una guía para los tipos de commits', status: 'done' }
    ];

    // --- Funciones de Renderizado ---

    const createCardHTML = (task) => {
        const card = document.createElement('div');
        card.classList.add('kanban-card');
        card.setAttribute('draggable', true);
        card.dataset.taskId = task.id;
        card.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>
        `;
        return card;
    };

    const renderBoard = () => {
        board.innerHTML = ''; // Limpiar el tablero
        columns.forEach(col => {
            const columnEl = document.createElement('div');
            columnEl.classList.add('kanban-column');
            columnEl.id = col.id;
            // Configuración para Drag & Drop (soltar)
            columnEl.addEventListener('dragover', handleDragOver);
            columnEl.addEventListener('drop', handleDrop);
            
            columnEl.innerHTML = `<div class="column-header">${col.title}</div>`;
            
            // Renderizar las tareas para esta columna
            const columnTasks = tasks.filter(t => t.status === col.id);
            columnTasks.forEach(task => {
                const cardEl = createCardHTML(task);
                // Configuración para Drag & Drop (arrastrar)
                cardEl.addEventListener('dragstart', handleDragStart);
                columnEl.appendChild(cardEl);
            });

            board.appendChild(columnEl);
        });
    };

    // --- Lógica de Drag and Drop ---

    let draggedItem = null;

    function handleDragStart(e) {
        draggedItem = e.target;
        // Agregar la clase de arrastre para efectos visuales
        setTimeout(() => e.target.classList.add('is-dragging'), 0);
    }

    function handleDragOver(e) {
        e.preventDefault(); // Permite soltar
        e.target.closest('.kanban-column').classList.add('drag-over');
    }

    function handleDragLeave(e) {
        e.target.closest('.kanban-column').classList.remove('drag-over');
    }
    
    function handleDrop(e) {
        e.preventDefault();
        const targetColumn = e.target.closest('.kanban-column');
        if (targetColumn && draggedItem) {
            // 1. Mover la tarjeta visualmente
            targetColumn.appendChild(draggedItem);
            
            // 2. Actualizar el estado de la tarea en el array `tasks`
            const taskId = parseInt(draggedItem.dataset.taskId);
            const newStatus = targetColumn.id;

            const taskIndex = tasks.findIndex(t => t.id === taskId);
            if (taskIndex > -1) {
                tasks[taskIndex].status = newStatus;
                // Opcional: Guardar tareas en LocalStorage después de la actualización
                saveTasksToLocalStorage();
            }

            // 3. Limpiar clases
            draggedItem.classList.remove('is-dragging');
            targetColumn.classList.remove('drag-over');
            draggedItem = null;
        }
    }
    
    // Añadir eventos dragleave a las columnas
    document.querySelectorAll('.kanban-column').forEach(column => {
        column.addEventListener('dragleave', handleDragLeave);
    });

    // --- Lógica de Formulario y Modal ---

    const modal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('taskForm');

    addTaskBtn.onclick = () => { modal.style.display = 'block'; };
    closeBtn.onclick = () => { modal.style.display = 'none'; };
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const status = document.getElementById('taskColumn').value;
        
        // Crear nueva tarea
        const newTask = {
            id: Date.now(), // ID único
            title,
            description,
            status
        };

        tasks.push(newTask);
        saveTasksToLocalStorage(); // Guardar
        renderBoard(); // Renderizar de nuevo el tablero
        
        // Limpiar y cerrar
        taskForm.reset();
        modal.style.display = 'none';

        // Opcional: Mostrar un mensaje de éxito o feedback
    });

    // --- Persistencia de Datos (LocalStorage) ---

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('kanbanTasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }

    // --- Inicialización ---

    loadTasksFromLocalStorage();
    renderBoard();
});