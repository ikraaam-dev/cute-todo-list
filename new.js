const button = document.querySelector(".btn");
const input = document.querySelector(".inpt");
const list = document.querySelector(".todo");
const count = document.getElementById("count");

// Get saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task counter
function updateCount() {
    count.textContent = "Tasks: " + tasks.length;
}

// Display a task
function createTask(task, index) {
    const newtask = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const taskText = document.createTextNode(" " + task.text);

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";

    newtask.appendChild(checkbox);
    newtask.appendChild(taskText);
    newtask.appendChild(deletebtn);

    if (task.completed) {
        newtask.style.textDecoration = "line-through";
    }

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;

        newtask.style.textDecoration =
            checkbox.checked ? "line-through" : "none";

        saveTasks();
    });

    deletebtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    return newtask;
}

// Display all saved tasks
function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.appendChild(createTask(task, index));
    });

    updateCount();
}

// Add a new task
button.addEventListener("click", () => {
    console.log("Task added successfully");

    const value = input.value;

    if (value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: value,
        completed: false
    });

    saveTasks();

    input.value = "";

    renderTasks();
});

// Add task using Enter
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        button.click();
    }
});

// Load saved tasks when the page opens
renderTasks();
