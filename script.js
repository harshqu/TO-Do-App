// App State
let state = {
    boards: [
        {
            id: 1,
            name: "Platform Launch",
            columns: [
                { id: 1, name: "Todo", color: "#49C4E5", tasks: [1, 2, 3, 4] },
                { id: 2, name: "Doing", color: "#FF9898", tasks: [5, 6, 7, 8, 9, 10] },
                { id: 3, name: "Done", color: "#635FC7", tasks: [11, 12, 13, 14, 15, 16, 17] }
            ]
        },
        {
            id: 2,
            name: "Marketing Plan",
            columns: [
                { id: 4, name: "Todo", color: "#49C4E5", tasks: [] },
                { id: 5, name: "Doing", color: "#FF9898", tasks: [] },
                { id: 6, name: "Done", color: "#635FC7", tasks: [] }
            ]
        },
        {
            id: 3,
            name: "Roadmap",
            columns: [
                { id: 7, name: "Todo", color: "#49C4E5", tasks: [] },
                { id: 8, name: "Doing", color: "#FF9898", tasks: [] },
                { id: 9, name: "Done", color: "#635FC7", tasks: [] }
            ]
        }
    ],
    tasks: {
        1: { id: 1, title: "Build UI for onboarding flow", description: "", status: "todo", subtasks: [{title: "Design UI", completed: false}, {title: "Implement UI", completed: false}, {title: "Test UI", completed: false}] },
        2: { id: 2, title: "Build settings UI", description: "", status: "todo", subtasks: [{title: "Design settings page", completed: false}, {title: "Implement settings", completed: false}] },
        3: { id: 3, title: "Design onboarding flow", description: "", status: "todo", subtasks: [{title: "Research user needs", completed: true}, {title: "Create wireframes", completed: false}, {title: "Get approval", completed: false}] },
        4: { id: 4, title: "Research pricing points of various competitors and trial different business models", description: "", status: "todo", subtasks: [{title: "Research competitors", completed: true}, {title: "Analyze pricing models", completed: false}] },
        5: { id: 5, title: "Build UI for search", description: "", status: "doing", subtasks: [{title: "Design search UI", completed: false}] },
        6: { id: 6, title: "Add search endpoints", description: "", status: "doing", subtasks: [{title: "Create API endpoints", completed: true}, {title: "Test endpoints", completed: false}] },
        7: { id: 7, title: "Add authentication endpoints", description: "", status: "doing", subtasks: [{title: "Implement auth", completed: true}, {title: "Test auth", completed: false}] },
        8: { id: 8, title: "Design settings and search pages", description: "", status: "doing", subtasks: [{title: "Create mockups", completed: true}, {title: "Get feedback", completed: false}, {title: "Finalize designs", completed: false}] },
        9: { id: 9, title: "Add account management endpoints", description: "", status: "doing", subtasks: [{title: "Create endpoints", completed: true}, {title: "Test endpoints", completed: true}, {title: "Document endpoints", completed: false}] },
        10: { id: 10, title: "Add new Task", description: "", status: "doing", subtasks: [{title: "Design form", completed: true}, {title: "Implement form", completed: false}, {title: "Test form", completed: false}] },
        11: { id: 11, title: "Conduct 5 wireframe tests", description: "", status: "done", subtasks: [{title: "Complete tests", completed: true}] },
        12: { id: 12, title: "Create wireframe prototype", description: "", status: "done", subtasks: [{title: "Create prototype", completed: true}] },
        13: { id: 13, title: "Review results of usability tests and iterate", description: "", status: "done", subtasks: [{title: "Analyze results", completed: true}, {title: "Make changes", completed: true}, {title: "Retest", completed: false}] },
        14: { id: 14, title: "Create paper prototypes and conduct 10 usability tests with potential customers", description: "", status: "done", subtasks: [{title: "Create prototypes", completed: true}, {title: "Conduct tests", completed: true}, {title: "Analyze results", completed: false}, {title: "Make changes", completed: false}, {title: "Retest", completed: false}, {title: "Finalize", completed: false}, {title: "Present findings", completed: false}] },
        15: { id: 15, title: "Market discovery", description: "", status: "done", subtasks: [{title: "Complete research", completed: true}] },
        16: { id: 16, title: "Competitor analysis", description: "", status: "done", subtasks: [{title: "Identify competitors", completed: true}, {title: "Analyze features", completed: true}, {title: "Compare pricing", completed: false}, {title: "Document findings", completed: false}, {title: "Present results", completed: false}, {title: "Make recommendations", completed: false}, {title: "Finalize report", completed: false}] },
        17: { id: 17, title: "Research the market", description: "", status: "done", subtasks: [{title: "Gather data", completed: true}, {title: "Analyze trends", completed: true}, {title: "Identify opportunities", completed: false}, {title: "Document findings", completed: false}, {title: "Present results", completed: false}, {title: "Make recommendations", completed: false}, {title: "Finalize report", completed: false}] }
    },
    currentBoardId: 1
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initSidebar();
    initBoard();
    initModals();
    initDragAndDrop();
    updateBoardCount();
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Sidebar Management
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const hideSidebarBtn = document.querySelector('.hide-sidebar');
    const showSidebarBtn = document.querySelector('.show-sidebar');
    
    hideSidebarBtn.addEventListener('click', function() {
        sidebar.classList.add('sidebar-collapsed');
        showSidebarBtn.style.display = 'flex';
    });
    
    showSidebarBtn.addEventListener('click', function() {
        sidebar.classList.remove('sidebar-collapsed');
        showSidebarBtn.style.display = 'none';
    });
    
    // Board Switching
    const boardItems = document.querySelectorAll('.board-item:not(.create-board)');
    
    boardItems.forEach(item => {
        item.addEventListener('click', function() {
            const boardId = parseInt(this.dataset.boardId);
            switchBoard(boardId);
        });
    });
    
    // Create New Board
    const createBoardBtn = document.getElementById('create-board-btn');
    createBoardBtn.addEventListener('click', function() {
        openBoardModal();
    });
}

// Board Management
function initBoard() {
    renderBoard(state.currentBoardId);
    
    // Board Options Dropdown
    const boardOptions = document.getElementById('board-options');
    document.addEventListener('click', function(event) {
        if (event.target.closest('#board-options')) {
            boardOptions.classList.toggle('show');
        } else {
            boardOptions.classList.remove('show');
        }
    });
    
    // Edit Board
    document.getElementById('edit-board-btn').addEventListener('click', function() {
        openEditBoardModal();
        boardOptions.classList.remove('show');
    });
    
    // Delete Board
    document.getElementById('delete-board-btn').addEventListener('click', function() {
        openDeleteBoardModal();
        boardOptions.classList.remove('show');
    });
}

function renderBoard(boardId) {
    const board = state.boards.find(b => b.id === boardId);
    if (!board) return;
    
    state.currentBoardId = boardId;
    document.getElementById('current-board-name').textContent = board.name;
    
    const kanbanBoard = document.getElementById('kanban-board');
    kanbanBoard.innerHTML = '';
    
    // Render columns
    board.columns.forEach(column => {
        const columnEl = document.createElement('div');
        columnEl.className = 'column';
        columnEl.dataset.status = column.name.toLowerCase().replace(' ', '-');
        columnEl.dataset.columnId = column.id;
        
        const columnHeader = document.createElement('div');
        columnHeader.className = 'column-header';
        
        const columnColor = document.createElement('div');
        columnColor.className = 'column-color';
        columnColor.style.backgroundColor = column.color;
        
        const columnName = document.createElement('span');
        columnName.innerHTML = `${column.name.toUpperCase()} (<span class="task-count">0</span>)`;
        
        const columnOptions = document.createElement('i');
        columnOptions.className = 'fas fa-ellipsis-vertical column-options';
        columnOptions.addEventListener('click', (e) => {
            e.stopPropagation();
            openColumnOptions(column.id);
        });
        
        columnHeader.appendChild(columnColor);
        columnHeader.appendChild(columnName);
        columnHeader.appendChild(columnOptions);
        columnEl.appendChild(columnHeader);
        
        // Render tasks
        column.tasks.forEach(taskId => {
            const task = state.tasks[taskId];
            if (task) {
                const completedSubtasks = task.subtasks.filter(st => st.completed).length;
                const totalSubtasks = task.subtasks.length;
                
                const taskCard = document.createElement('div');
                taskCard.className = 'task-card';
                taskCard.draggable = true;
                taskCard.dataset.taskId = task.id;
                
                const taskTitle = document.createElement('div');
                taskTitle.className = 'task-title';
                taskTitle.textContent = task.title;
                
                const taskSubtasks = document.createElement('div');
                taskSubtasks.className = 'task-subtasks';
                taskSubtasks.textContent = `${completedSubtasks} of ${totalSubtasks} substates`;
                
                const taskOptions = document.createElement('i');
                taskOptions.className = 'fas fa-ellipsis-vertical task-options';
                taskOptions.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openTaskOptions(task.id);
                });
                
                taskCard.appendChild(taskTitle);
                taskCard.appendChild(taskSubtasks);
                taskCard.appendChild(taskOptions);
                columnEl.appendChild(taskCard);
                
                // Add drag and drop
                setupDragAndDrop(taskCard);
            }
        });
        
        // Add new task button
        const addTaskBtn = document.createElement('div');
        addTaskBtn.className = 'new-column';
        addTaskBtn.textContent = '+ Add Task';
        addTaskBtn.addEventListener('click', () => {
            openTaskModal(column.id);
        });
        
        columnEl.appendChild(addTaskBtn);
        kanbanBoard.appendChild(columnEl);
        
        // Update task count
        updateTaskCount(columnEl);
    });
    
    // Add new column button
    const addColumnBtn = document.createElement('div');
    addColumnBtn.className = 'new-column';
    addColumnBtn.id = 'add-column-btn';
    addColumnBtn.textContent = '+ New Column';
    addColumnBtn.addEventListener('click', openColumnModal);
    kanbanBoard.appendChild(addColumnBtn);
    
    // Update active board in sidebar
    document.querySelectorAll('.board-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.boardId) === boardId) {
            item.classList.add('active');
        }
    });
}

function switchBoard(boardId) {
    renderBoard(boardId);
}

function updateTaskCount(columnEl) {
    const taskCount = columnEl.querySelectorAll('.task-card').length;
    columnEl.querySelector('.task-count').textContent = taskCount;
}

function updateBoardCount() {
    document.getElementById('board-count').textContent = state.boards.length;
}

// Task Management
function initModals() {
    // Add Task Modal
    const taskModal = document.getElementById('task-modal');
    const addTaskBtn = document.getElementById('add-task-btn');
    const closeTaskModal = taskModal.querySelector('.close-modal');
    const taskForm = document.getElementById('task-form');
    
    addTaskBtn.addEventListener('click', function() {
        const board = state.boards.find(b => b.id === state.currentBoardId);
        if (board && board.columns.length > 0) {
            openTaskModal(board.columns[0].id);
        }
    });
    
    closeTaskModal.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });
    
    // Add Subtask
    const addSubtaskBtn = document.getElementById('add-subtask');
    const subtasksList = document.getElementById('subtasks-list');
    
    addSubtaskBtn.addEventListener('click', function() {
        addSubtaskField(subtasksList);
    });
    
    // Submit Task Form
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const status = document.getElementById('task-status').value;
        const subtasks = Array.from(document.querySelectorAll('#subtasks-list .subtask-input')).map(input => ({
            title: input.value,
            completed: false
        }));
        
        // Create new task
        const newTaskId = Date.now();
        const newTask = {
            id: newTaskId,
            title,
            description,
            status,
            subtasks
        };
        
        // Add to state
        state.tasks[newTaskId] = newTask;
        
        // Add to current board's first column (for simplicity)
        const board = state.boards.find(b => b.id === state.currentBoardId);
        if (board) {
            const column = board.columns.find(c => c.name.toLowerCase() === status);
            if (column) {
                column.tasks.push(newTaskId);
            }
        }
        
        // Re-render board
        renderBoard(state.currentBoardId);
        
        // Close modal and reset form
        taskModal.style.display = 'none';
        taskForm.reset();
        
        // Reset subtasks list (keep 2 empty ones)
        resetSubtasksList();
    });
    
    // Edit Task Modal
    const editTaskModal = document.getElementById('edit-task-modal');
    const closeEditTaskModal = editTaskModal.querySelector('.close-modal');
    const editTaskForm = document.getElementById('edit-task-form');
    
    closeEditTaskModal.addEventListener('click', function() {
        editTaskModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === editTaskModal) {
            editTaskModal.style.display = 'none';
        }
    });
    
    // Add Subtask in Edit Modal
    const editAddSubtaskBtn = document.getElementById('edit-add-subtask');
    
    editAddSubtaskBtn.addEventListener('click', function() {
        addSubtaskField(document.getElementById('edit-subtasks-list'));
    });
    
    // Submit Edit Task Form
    editTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskId = parseInt(this.dataset.taskId);
        const title = document.getElementById('edit-task-title').value;
        const description = document.getElementById('edit-task-description').value;
        const status = document.getElementById('edit-task-status').value;
        const subtasks = Array.from(document.querySelectorAll('#edit-subtasks-list .subtask-item')).map(item => ({
            title: item.querySelector('.subtask-input').value,
            completed: item.querySelector('input[type="checkbox"]') ? item.querySelector('input[type="checkbox"]').checked : false
        }));
        
        // Update task in state
        if (state.tasks[taskId]) {
            const oldStatus = state.tasks[taskId].status;
            
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                title,
                description,
                status,
                subtasks
            };
            
            // If status changed, move task to new column
            if (oldStatus !== status) {
                const board = state.boards.find(b => b.id === state.currentBoardId);
                if (board) {
                    // Remove from old column
                    board.columns.forEach(column => {
                        if (column.name.toLowerCase() === oldStatus) {
                            const index = column.tasks.indexOf(taskId);
                            if (index > -1) {
                                column.tasks.splice(index, 1);
                            }
                        }
                    });
                    
                    // Add to new column
                    const newColumn = board.columns.find(c => c.name.toLowerCase() === status);
                    if (newColumn) {
                        newColumn.tasks.push(taskId);
                    }
                }
            }
        }
        
        // Re-render board
        renderBoard(state.currentBoardId);
        
        // Close modal
        editTaskModal.style.display = 'none';
    });
    
    // Delete Task Modal
    const deleteTaskModal = document.getElementById('delete-task-modal');
    const confirmDeleteTaskBtn = document.getElementById('confirm-delete-task');
    const cancelDeleteTaskBtn = document.getElementById('cancel-delete-task');
    
    confirmDeleteTaskBtn.addEventListener('click', function() {
        const taskId = parseInt(deleteTaskModal.dataset.taskId);
        deleteTask(taskId);
        deleteTaskModal.style.display = 'none';
    });
    
    cancelDeleteTaskBtn.addEventListener('click', function() {
        deleteTaskModal.style.display = 'none';
    });
    
    // Add Column Modal
    const columnModal = document.getElementById('column-modal');
    const addColumnBtn = document.getElementById('add-column-btn');
    const closeColumnModal = columnModal.querySelector('.close-modal');
    const columnForm = document.getElementById('column-form');
    
    addColumnBtn.addEventListener('click', function() {
        columnModal.style.display = 'flex';
    });
    
    closeColumnModal.addEventListener('click', function() {
        columnModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === columnModal) {
            columnModal.style.display = 'none';
        }
    });
    
    // Column Color Selection
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Submit Column Form
    columnForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('column-name').value;
        const color = document.querySelector('.color-option.selected').dataset.color;
        
        // Create new column
        const newColumnId = Date.now();
        const newColumn = {
            id: newColumnId,
            name,
            color,
            tasks: []
        };
        
        // Add to current board
        const board = state.boards.find(b => b.id === state.currentBoardId);
        if (board) {
            board.columns.push(newColumn);
        }
        
        // Re-render board
        renderBoard(state.currentBoardId);
        
        // Close modal and reset form
        columnModal.style.display = 'none';
        columnForm.reset();
        
        // Reset color selection
        document.querySelectorAll('.color-option').forEach((opt, index) => {
            opt.classList.toggle('selected', index === 0);
        });
    });
    
    // Edit Column Modal
    const editColumnModal = document.getElementById('edit-column-modal');
    const closeEditColumnModal = editColumnModal.querySelector('.close-modal');
    const editColumnForm = document.getElementById('edit-column-form');
    
    closeEditColumnModal.addEventListener('click', function() {
        editColumnModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === editColumnModal) {
            editColumnModal.style.display = 'none';
        }
    });
    
    // Submit Edit Column Form
    editColumnForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const columnId = parseInt(this.dataset.columnId);
        const name = document.getElementById('edit-column-name').value;
        const color = document.querySelector('#edit-column-colors .color-option.selected').dataset.color;
        
        // Update column in state
        const board = state.boards.find(b => b.id === state.currentBoardId);
        if (board) {
            const column = board.columns.find(c => c.id === columnId);
            if (column) {
                column.name = name;
                column.color = color;
            }
        }
        
        // Re-render board
        renderBoard(state.currentBoardId);
        
        // Close modal
        editColumnModal.style.display = 'none';
    });
    
    // Delete Column Modal
    const deleteColumnModal = document.getElementById('delete-column-modal');
    const confirmDeleteColumnBtn = document.getElementById('confirm-delete-column');
    const cancelDeleteColumnBtn = document.getElementById('cancel-delete-column');
    
    confirmDeleteColumnBtn.addEventListener('click', function() {
        const columnId = parseInt(deleteColumnModal.dataset.columnId);
        deleteColumn(columnId);
        deleteColumnModal.style.display = 'none';
    });
    
    cancelDeleteColumnBtn.addEventListener('click', function() {
        deleteColumnModal.style.display = 'none';
    });
    
    // Add Board Modal
    const boardModal = document.getElementById('board-modal');
    const closeBoardModal = boardModal.querySelector('.close-modal');
    const boardForm = document.getElementById('board-form');
    
    closeBoardModal.addEventListener('click', function() {
        boardModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === boardModal) {
            boardModal.style.display = 'none';
        }
    });
    
    // Add Board Column
    const addBoardColumnBtn = document.getElementById('add-board-column');
    
    addBoardColumnBtn.addEventListener('click', function() {
        const columnItem = document.createElement('div');
        columnItem.className = 'subtask-item';
        columnItem.innerHTML = `
            <input type="text" class="form-input subtask-input" placeholder="e.g. In Progress">
            <i class="fas fa-times remove-column"></i>
        `;
        document.getElementById('board-columns-list').appendChild(columnItem);
        
        // Add event listener to remove button
        columnItem.querySelector('.remove-column').addEventListener('click', function() {
            columnItem.remove();
        });
    });
    
    // Submit Board Form
    boardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('board-name').value;
        const columns = Array.from(document.querySelectorAll('#board-columns-list .subtask-input')).map(input => ({
            name: input.value,
            color: getRandomColor(),
            tasks: []
        }));
        
        // Create new board
        const newBoardId = Date.now();
        const newBoard = {
            id: newBoardId,
            name,
            columns: columns.map((col, index) => ({
                id: newBoardId * 100 + index,
                name: col.name,
                color: col.color,
                tasks: []
            }))
        };
        
        // Add to state
        state.boards.push(newBoard);
        
        // Update UI
        updateBoardCount();
        
        // Create board item in sidebar
        const boardList = document.getElementById('board-list');
        const createBoardBtn = document.getElementById('create-board-btn');
        
        const boardItem = document.createElement('li');
        boardItem.className = 'board-item';
        boardItem.dataset.boardId = newBoardId;
        boardItem.innerHTML = `
            <i class="fas fa-columns board-icon"></i>
            <span class="board-name">${name}</span>
        `;
        
        boardList.insertBefore(boardItem, createBoardBtn);
        
        // Add click event to switch to new board
        boardItem.addEventListener('click', function() {
            switchBoard(newBoardId);
        });
        
        // Switch to new board
        switchBoard(newBoardId);
        
        // Close modal and reset form
        boardModal.style.display = 'none';
        boardForm.reset();
        
        // Reset columns list
        resetBoardColumnsList();
    });
    
    // Edit Board Modal
    const editBoardModal = document.getElementById('edit-board-modal');
    const closeEditBoardModal = editBoardModal.querySelector('.close-modal');
    const editBoardForm = document.getElementById('edit-board-form');
    
    closeEditBoardModal.addEventListener('click', function() {
        editBoardModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === editBoardModal) {
            editBoardModal.style.display = 'none';
        }
    });
    
    // Add Board Column in Edit Modal
    const editAddBoardColumnBtn = document.getElementById('edit-add-board-column');
    
    editAddBoardColumnBtn.addEventListener('click', function() {
        const columnItem = document.createElement('div');
        columnItem.className = 'subtask-item';
        columnItem.innerHTML = `
            <input type="text" class="form-input subtask-input" placeholder="e.g. In Progress">
            <i class="fas fa-times remove-column"></i>
        `;
        document.getElementById('edit-board-columns-list').appendChild(columnItem);
        
        // Add event listener to remove button
        columnItem.querySelector('.remove-column').addEventListener('click', function() {
            columnItem.remove();
        });
    });
    
    // Submit Edit Board Form
    editBoardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const boardId = parseInt(this.dataset.boardId);
        const name = document.getElementById('edit-board-name').value;
        const columns = Array.from(document.querySelectorAll('#edit-board-columns-list .subtask-item')).map(item => {
            const existingColumnId = item.dataset.columnId ? parseInt(item.dataset.columnId) : null;
            return {
                id: existingColumnId || Date.now() + Math.floor(Math.random() * 1000),
                name: item.querySelector('.subtask-input').value,
                color: item.dataset.color || getRandomColor(),
                tasks: existingColumnId ? 
                    (state.boards.find(b => b.id === boardId)?.columns.find(c => c.id === existingColumnId)?.tasks || []) 
                    : []
            };
        });
        
        // Update board in state
        const boardIndex = state.boards.findIndex(b => b.id === boardId);
        if (boardIndex !== -1) {
            state.boards[boardIndex] = {
                ...state.boards[boardIndex],
                name,
                columns
            };
        }
        
        // Update board name in sidebar
        document.querySelectorAll('.board-item').forEach(item => {
            if (parseInt(item.dataset.boardId) === boardId) {
                item.querySelector('.board-name').textContent = name;
            }
        });
        
        // Update current board name in header if this is the current board
        if (state.currentBoardId === boardId) {
            document.getElementById('current-board-name').textContent = name;
        }
        
        // Re-render board
        renderBoard(boardId);
        
        // Close modal
        editBoardModal.style.display = 'none';
    });
    
    // Delete Board Modal
    const deleteBoardModal = document.getElementById('delete-board-modal');
    const confirmDeleteBoardBtn = document.getElementById('confirm-delete-board');
    const cancelDeleteBoardBtn = document.getElementById('cancel-delete-board');
    
    confirmDeleteBoardBtn.addEventListener('click', function() {
        const boardId = parseInt(deleteBoardModal.dataset.boardId);
        deleteBoard(boardId);
        deleteBoardModal.style.display = 'none';
    });
    
    cancelDeleteBoardBtn.addEventListener('click', function() {
        deleteBoardModal.style.display = 'none';
    });
}

function openTaskModal(columnId) {
    const taskModal = document.getElementById('task-modal');
    const board = state.boards.find(b => b.id === state.currentBoardId);
    
    if (board) {
        const statusSelect = document.getElementById('task-status');
        statusSelect.innerHTML = '';
        
        board.columns.forEach(column => {
            const option = document.createElement('option');
            option.value = column.name.toLowerCase();
            option.textContent = column.name;
            option.selected = column.id === columnId;
            statusSelect.appendChild(option);
        });
    }
    
    resetSubtasksList();
    taskModal.style.display = 'flex';
}

function openEditTaskModal(taskId) {
    const task = state.tasks[taskId];
    if (!task) return;
    
    const editTaskModal = document.getElementById('edit-task-modal');
    const editTaskForm = document.getElementById('edit-task-form');
    const board = state.boards.find(b => b.id === state.currentBoardId);
    
    // Set task ID on form
    editTaskForm.dataset.taskId = taskId;
    
    // Populate form fields
    document.getElementById('edit-task-title').value = task.title;
    document.getElementById('edit-task-description').value = task.description;
    
    // Populate status dropdown
    const statusSelect = document.getElementById('edit-task-status');
    statusSelect.innerHTML = '';
    
    if (board) {
        board.columns.forEach(column => {
            const option = document.createElement('option');
            option.value = column.name.toLowerCase();
            option.textContent = column.name;
            option.selected = column.name.toLowerCase() === task.status;
            statusSelect.appendChild(option);
        });
    }
    
    // Populate subtasks
    const subtasksList = document.getElementById('edit-subtasks-list');
    subtasksList.innerHTML = '';
    
    task.subtasks.forEach(subtask => {
        const subtaskItem = document.createElement('div');
        subtaskItem.className = 'subtask-item';
        subtaskItem.innerHTML = `
            <input type="text" class="form-input subtask-input" value="${subtask.title}">
            <input type="checkbox" ${subtask.completed ? 'checked' : ''}>
            <i class="fas fa-times remove-subtask"></i>
        `;
        subtasksList.appendChild(subtaskItem);
        
        // Add event listener to remove button
        subtaskItem.querySelector('.remove-subtask').addEventListener('click', function() {
            subtaskItem.remove();
        });
    });
    
    editTaskModal.style.display = 'flex';
}

function openDeleteTaskModal(taskId) {
    const deleteTaskModal = document.getElementById('delete-task-modal');
    deleteTaskModal.dataset.taskId = taskId;
    deleteTaskModal.style.display = 'flex';
}

function deleteTask(taskId) {
    // Remove task from state
    delete state.tasks[taskId];
    
    // Remove task from all columns in current board
    const board = state.boards.find(b => b.id === state.currentBoardId);
    if (board) {
        board.columns.forEach(column => {
            const index = column.tasks.indexOf(taskId);
            if (index > -1) {
                column.tasks.splice(index, 1);
            }
        });
    }
    
    // Re-render board
    renderBoard(state.currentBoardId);
}

function openColumnModal() {
    const columnModal = document.getElementById('column-modal');
    document.getElementById('column-name').value = '';
    columnModal.style.display = 'flex';
}

function openEditColumnModal(columnId) {
    const board = state.boards.find(b => b.id === state.currentBoardId);
    if (!board) return;
    
    const column = board.columns.find(c => c.id === columnId);
    if (!column) return;
    
    const editColumnModal = document.getElementById('edit-column-modal');
    const editColumnForm = document.getElementById('edit-column-form');
    
    // Set column ID on form
    editColumnForm.dataset.columnId = columnId;
    
    // Populate form fields
    document.getElementById('edit-column-name').value = column.name;
    
    // Set selected color
    document.querySelectorAll('#edit-column-colors .color-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.color === column.color);
    });
    
    editColumnModal.style.display = 'flex';
}

function openDeleteColumnModal(columnId) {
    const deleteColumnModal = document.getElementById('delete-column-modal');
    deleteColumnModal.dataset.columnId = columnId;
    deleteColumnModal.style.display = 'flex';
}

function deleteColumn(columnId) {
    // Remove column from current board
    const board = state.boards.find(b => b.id === state.currentBoardId);
    if (board) {
        const columnIndex = board.columns.findIndex(c => c.id === columnId);
        if (columnIndex > -1) {
            board.columns.splice(columnIndex, 1);
        }
    }
    
    // Re-render board
    renderBoard(state.currentBoardId);
}

function openBoardModal() {
    const boardModal = document.getElementById('board-modal');
    document.getElementById('board-name').value = '';
    resetBoardColumnsList();
    boardModal.style.display = 'flex';
}

function openEditBoardModal() {
    const board = state.boards.find(b => b.id === state.currentBoardId);
    if (!board) return;
    
    const editBoardModal = document.getElementById('edit-board-modal');
    const editBoardForm = document.getElementById('edit-board-form');
    
    // Set board ID on form
    editBoardForm.dataset.boardId = board.id;
    
    // Populate form fields
    document.getElementById('edit-board-name').value = board.name;
    
    // Populate columns
    const columnsList = document.getElementById('edit-board-columns-list');
    columnsList.innerHTML = '';
    
    board.columns.forEach(column => {
        const columnItem = document.createElement('div');
        columnItem.className = 'subtask-item';
        columnItem.dataset.columnId = column.id;
        columnItem.dataset.color = column.color;
        columnItem.innerHTML = `
            <input type="text" class="form-input subtask-input" value="${column.name}">
            <i class="fas fa-times remove-column"></i>
        `;
        columnsList.appendChild(columnItem);
        
        // Add event listener to remove button
        columnItem.querySelector('.remove-column').addEventListener('click', function() {
            columnItem.remove();
        });
    });
    
    editBoardModal.style.display = 'flex';
}

function openDeleteBoardModal() {
    const deleteBoardModal = document.getElementById('delete-board-modal');
    deleteBoardModal.dataset.boardId = state.currentBoardId;
    deleteBoardModal.style.display = 'flex';
}

function deleteBoard(boardId) {
    // Remove board from state
    const boardIndex = state.boards.findIndex(b => b.id === boardId);
    if (boardIndex > -1) {
        state.boards.splice(boardIndex, 1);
    }
    
    // Remove board from sidebar
    document.querySelector(`.board-item[data-board-id="${boardId}"]`).remove();
    
    // Update board count
    updateBoardCount();
    
    // Switch to first available board or show empty state
    if (state.boards.length > 0) {
        switchBoard(state.boards[0].id);
    } else {
        // Show empty state (would be implemented in a real app)
        document.getElementById('current-board-name').textContent = 'No Boards';
        document.getElementById('kanban-board').innerHTML = '<p>No boards available. Create a new board to get started.</p>';
    }
}

function openTaskOptions(taskId) {
    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-content';
    dropdown.style.display = 'block';
    dropdown.style.position = 'absolute';
    dropdown.style.right = '0';
    dropdown.style.top = '30px';
    
    dropdown.innerHTML = `
        <div class="dropdown-item edit-task">Edit Task</div>
        <div class="dropdown-item delete delete-task">Delete Task</div>
    `;
    
    // Add event listeners
    dropdown.querySelector('.edit-task').addEventListener('click', () => {
        openEditTaskModal(taskId);
        dropdown.remove();
    });
    
    dropdown.querySelector('.delete-task').addEventListener('click', () => {
        openDeleteTaskModal(taskId);
        dropdown.remove();
    });
    
    // Add to DOM
    const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"]`);
    taskCard.appendChild(dropdown);
    
    // Close when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!taskCard.contains(e.target)) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    });
}

function openColumnOptions(columnId) {
    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-content';
    dropdown.style.display = 'block';
    dropdown.style.position = 'absolute';
    dropdown.style.right = '0';
    dropdown.style.top = '30px';
    
    dropdown.innerHTML = `
        <div class="dropdown-item edit-column">Edit Column</div>
        <div class="dropdown-item delete delete-column">Delete Column</div>
    `;
    
    // Add event listeners
    dropdown.querySelector('.edit-column').addEventListener('click', () => {
        openEditColumnModal(columnId);
        dropdown.remove();
    });
    
    dropdown.querySelector('.delete-column').addEventListener('click', () => {
        openDeleteColumnModal(columnId);
        dropdown.remove();
    });
    
    // Add to DOM
    const column = document.querySelector(`.column[data-column-id="${columnId}"] .column-header`);
    column.appendChild(dropdown);
    
    // Close when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!column.contains(e.target)) {
            dropdown.remove();
            document.removeEventListener('click', closeDropdown);
        }
    });
}

function addSubtaskField(container) {
    const subtaskItem = document.createElement('div');
    subtaskItem.className = 'subtask-item';
    subtaskItem.innerHTML = `
        <input type="text" class="form-input subtask-input" placeholder="e.g. New subtask">
        <i class="fas fa-times remove-subtask"></i>
    `;
    container.appendChild(subtaskItem);
    
    // Add event listener to remove button
    subtaskItem.querySelector('.remove-subtask').addEventListener('click', function() {
        subtaskItem.remove();
    });
}

function resetSubtasksList() {
    const subtasksList = document.getElementById('subtasks-list');
    subtasksList.innerHTML = `
        <div class="subtask-item">
            <input type="text" class="form-input subtask-input" placeholder="e.g. Make coffee">
            <i class="fas fa-times remove-subtask"></i>
        </div>
        <div class="subtask-item">
            <input type="text" class="form-input subtask-input" placeholder="e.g. Drink coffee & smile">
            <i class="fas fa-times remove-subtask"></i>
        </div>
    `;
    
    // Re-add event listeners to remove buttons
    document.querySelectorAll('#subtasks-list .remove-subtask').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}

function resetBoardColumnsList() {
    const columnsList = document.getElementById('board-columns-list');
    columnsList.innerHTML = `
        <div class="subtask-item">
            <input type="text" class="form-input subtask-input" value="Todo">
            <i class="fas fa-times remove-column"></i>
        </div>
        <div class="subtask-item">
            <input type="text" class="form-input subtask-input" value="Doing">
            <i class="fas fa-times remove-column"></i>
        </div>
    `;
    
    // Re-add event listeners to remove buttons
    document.querySelectorAll('#board-columns-list .remove-column').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}

function getRandomColor() {
    const colors = ['#49C4E5', '#FF9898', '#635FC7', '#67E2AE'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Drag and Drop
function initDragAndDrop() {
    // Initialize drag and drop for all existing tasks
    document.querySelectorAll('.task-card').forEach(taskCard => {
        setupDragAndDrop(taskCard);
    });
    
    // Set up drop zones for columns
    document.querySelectorAll('.column').forEach(column => {
        column.addEventListener('dragover', function(e) {
            e.preventDefault();
            const draggingTask = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(this, e.clientY);
            
            if (afterElement) {
                this.insertBefore(draggingTask, afterElement);
            } else {
                const addTaskBtn = this.querySelector('.new-column');
                if (addTaskBtn) {
                    this.insertBefore(draggingTask, addTaskBtn);
                } else {
                    this.appendChild(draggingTask);
                }
            }
        });
        
        column.addEventListener('drop', function(e) {
            e.preventDefault();
            const taskId = parseInt(e.dataTransfer.getData('text/plain'));
            const task = state.tasks[taskId];
            if (!task) return;
            
            const newStatus = this.dataset.status;
            const oldStatus = task.status;
            
            // Update task status
            task.status = newStatus;
            
            // Update task position in board columns
            const board = state.boards.find(b => b.id === state.currentBoardId);
            if (board) {
                // Remove from old column
                board.columns.forEach(column => {
                    if (column.name.toLowerCase() === oldStatus) {
                        const index = column.tasks.indexOf(taskId);
                        if (index > -1) {
                            column.tasks.splice(index, 1);
                        }
                    }
                });
                
                // Add to new column
                const newColumn = board.columns.find(c => c.name.toLowerCase() === newStatus);
                if (newColumn) {
                    // Find position in new column
                    const taskElements = Array.from(this.querySelectorAll('.task-card'));
                    const position = taskElements.findIndex(el => parseInt(el.dataset.taskId) === taskId);
                    
                    if (position > -1) {
                        newColumn.tasks.splice(position, 0, taskId);
                    } else {
                        newColumn.tasks.push(taskId);
                    }
                }
            }
            
            // Update task counts for both source and target columns
            document.querySelectorAll('.column').forEach(col => {
                updateTaskCount(col);
            });
        });
    });
}

function setupDragAndDrop(taskCard) {
    taskCard.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', this.dataset.taskId);
        setTimeout(() => this.classList.add('dragging'), 0);
    });
    
    taskCard.addEventListener('dragend', function() {
        this.classList.remove('dragging');
    });
}

function getDragAfterElement(column, y) {
    const draggableElements = [...column.querySelectorAll('.task-card:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}