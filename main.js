// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listener for adding tasks
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText
    };

    // Add task to localStorage
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Render tasks
    renderTasks();
    taskInput.value = ""; // Clear input
});

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.setAttribute('data-id', task.id);
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        `;
        
        // Event listener for delete
        taskItem.querySelector('.delete').addEventListener('click', () => {
            deleteTask(task.id);
        });

        // Event listener for update
        taskItem.querySelector('.update').addEventListener('click', () => {
            updateTask(task.id);
        });

        taskList.appendChild(taskItem);
    });
}

// Function to delete task
function deleteTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    renderTasks(); // Re-render tasks after deletion
}

// Function to update task
function updateTask(taskId) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id === taskId);

    // Prompt for updated text
    const updatedText = prompt("Update your task:", task.text);
    if (updatedText && updatedText.trim() !== "") {
        task.text = updatedText.trim();
        
        // Save updated tasks back to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTasks(); // Re-render tasks with updated task
    }
}

// Initial render of tasks
function loadTasks() {
    renderTasks();
}
