//clinton todolist for gdsc
document.addEventListener('DOMContentLoaded', function () {
   
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

   
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
    function createTask(taskText) {
        return {
            text: taskText,
            done: false,
            subtasks: [],
            timestamp: new Date().toLocaleString()
        };
    }

   
    function createSubtask(subtaskText) {
        return subtaskText.trim();
    }
    function clearAllTasks() {
        const confirmClear = confirm("Are you sure you want to clear all tasks?");
        if (confirmClear) {
            localStorage.removeItem('tasks'); 
            renderTasks(); 
            updateTaskCounter(); 
        }
    }

  
    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        const tasks = getTasks();
        let doneTaskCount = 0;
        let undoneTaskCount = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item';

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            if (task.done) {
                taskText.classList.add('text-success');
                doneTaskCount++;
            } else {
                taskText.classList.add('text-danger');
                undoneTaskCount++;
            }

            const markDoneButton = document.createElement('button');
            markDoneButton.innerHTML = '&#10003;';
            markDoneButton.className = 'btn btn-success btn-sm';
            markDoneButton.addEventListener('click', () => {
                task.done = !task.done;
                saveTasks(tasks);
                renderTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&#128465;';
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks();
            });

            const editButton = document.createElement('button');
            editButton.innerHTML = '&#9998;';
            editButton.className = 'btn btn-primary btn-sm';
            editButton.addEventListener('click', () => {
                const newName = prompt('Edit task:', task.text);
                if (newName !== null) {
                    task.text = newName;
                    saveTasks(tasks);
                    renderTasks();
                }
            });

            const addSubtaskButton = document.createElement('button');
            addSubtaskButton.textContent = 'Add Subtask';
            addSubtaskButton.className = 'btn btn-info btn-sm';
            addSubtaskButton.addEventListener('click', () => {
                const subtaskInput = prompt('Enter a subtask:');
                if (subtaskInput !== null) {
                    task.subtasks.push(createSubtask(subtaskInput));
                    saveTasks(tasks);
                    renderTasks();
                }
            });
            const timestamp = document.createElement('span');
            timestamp.textContent = task.timestamp;
            timestamp.classList.add('text-muted');
           

            li.appendChild(taskText);
            li.appendChild(markDoneButton);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            li.appendChild(addSubtaskButton);
            li.appendChild(timestamp);

            const subtaskList = document.createElement('ul');
            subtaskList.className = 'list-group';

            task.subtasks.forEach((subtask, subtaskIndex) => {
                const subtaskLi = document.createElement('li');
                subtaskLi.className = 'list-group-item';

                const subtaskText = document.createElement('span');
                subtaskText.textContent = subtask;
                subtaskText.classList.add('text-danger');

                const deleteSubtaskButton = document.createElement('button');
                deleteSubtaskButton.innerHTML = '&#128465;';
                deleteSubtaskButton.className = 'btn btn-danger btn-sm';
                deleteSubtaskButton.addEventListener('click', () => {
                    task.subtasks.splice(subtaskIndex, 1);
                    saveTasks(tasks);
                    renderTasks();
                });

                subtaskLi.appendChild(subtaskText);
                subtaskLi.appendChild(deleteSubtaskButton);

                subtaskList.appendChild(subtaskLi);
            });

            li.appendChild(subtaskList);
            taskList.appendChild(li);
        });

        const doneTasksCount = document.getElementById('doneTasksCount');
        const undoneTasksCount = document.getElementById('undoneTasksCount');

        doneTasksCount.textContent = `${doneTaskCount} Completed`;
        undoneTasksCount.textContent = `${undoneTaskCount} Pending`;
    }

  
    const addTaskButton = document.getElementById('addTask');
    addTaskButton.addEventListener('click', function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText) {
            const tasks = getTasks();
            tasks.push(createTask(taskText));
            saveTasks(tasks);
            taskInput.value = '';
            renderTasks();
        }
    });
    const clearAllButton = document.getElementById('clearAll');
clearAllButton.addEventListener('click', clearAllTasks);

    function searchTasks(query) {
        const tasks = getTasks();
        return tasks.filter(task => task.text.toLowerCase().includes(query.toLowerCase()));
    }

    // Function to render search results
    function renderSearchResults(query) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
    
        const matchingTasks = searchTasks(query);
    
        if (matchingTasks.length === 0) {
            searchResults.innerHTML = '<li class="list-group-item">Task not found</li>';
        } else {
            matchingTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
    
                
                if (task.done) {
                    li.classList.add('text-success'); 
                } else {
                    li.classList.add('text-danger'); 
                }
    
                li.textContent = task.text;
                searchResults.appendChild(li);
            });
        }
    }

   
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim();
        renderSearchResults(query);
    });
  
    renderTasks();
});
