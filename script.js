let tasks = [];

// Add task
document.getElementById("addTaskBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    if (taskInput.value.trim()) {
        tasks.push({ text: taskInput.value.trim(), completed: false });
        taskInput.value = '';
        updateTasksList();
    }
});

// Update task list
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = `taskItem ${task.completed ? "completed" : ""}`;
        listItem.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
            <p>${task.text}</p>
            <div class="icons">
                <img src="images/edit.png" onclick="editTask(${index})" alt="Edit" />
                <img src="images/bin.png" onclick="deleteTask(${index})" alt="Delete" />
            </div>
 `;
        taskList.appendChild(listItem);
    });

    updateProgress();
};

// Toggle task completion
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

// Edit task
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    taskInput.focus();
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            tasks[index].text = taskInput.value.trim();
            taskInput.value = '';
            updateTasksList();
        }
    });
};

// Delete task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

// Filter tasks
document.getElementById("allTasksBtn").addEventListener("click", () => {
    updateTasksList();
});

document.getElementById("completedTasksBtn").addEventListener("click", () => {
    const filteredTasks = tasks.filter((task) => task.completed);
    updateTasksList(filteredTasks);
});

document.getElementById("pendingTasksBtn").addEventListener("click", () => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    updateTasksList(filteredTasks);
});

// Update progress bar
const updateProgress = () => {
    const completedTasks = tasks.filter((task) => task.completed);
    const progress = (completedTasks.length / tasks.length) * 100;
    document.getElementById("progress").style.width = `${progress}%`;
};

updateTasksList();

const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('addTaskBtn');
const allTasksBtn = document.getElementById('allTasksBtn');
const completedTasksBtn = document.getElementById('completedTasksBtn');
const pendingTasksBtn = document.getElementById('pendingTasksBtn');


addTaskBtn.addEventListener('click', addTask);
allTasksBtn.addEventListener('click', showAllTasks);
completedTasksBtn.addEventListener('click', showCompletedTasks);
pendingTasksBtn.addEventListener('click', showPendingTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({ text: task, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'taskItem';
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="icons">
                 <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                <img src="images/bin.png" onclick="deleteTask(${index})" alt="Delete" />
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function showAllTasks() {
    renderTasks();
}

function showCompletedTasks() {
    const completedTasks = tasks.filter(task => task.completed);
    taskList.innerHTML = '';
    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'taskItem completed';
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="icons">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                <img src="images/bin.png" onclick="deleteTask(${index})" alt="Delete" />
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function showPendingTasks() {
    const pendingTasks = tasks.filter(task => !task.completed);
    taskList.innerHTML = '';
    pendingTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'taskItem';
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="icons">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTaskComplete(${index})"/>
                <img src="images/bin.png" onclick="deleteTask(${index})" alt="Delete" />
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

