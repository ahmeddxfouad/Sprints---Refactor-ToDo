// Main.js
const input = document.querySelector(".input");
const submit = document.querySelector(".add");
const tasksDiv = document.querySelector(".tasks");

// Initialize an empty array for tasks (immutable principle)
let arrayOfTasks = [];

// Higher-Order Function: Add Task
const addTaskToArray = (taskText) => {
  const newTask = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  // Create a new array with the new task (immutability)
  arrayOfTasks = [...arrayOfTasks, newTask];
  renderTasks(arrayOfTasks);
};

// Higher-Order Function: Render Tasks
const renderTasks = (tasks) => {
  tasksDiv.innerHTML = ""; // Clear existing tasks

  tasks.map((task) => {
    // Create task element
    const taskDiv = document.createElement("div");
    taskDiv.className = task.completed ? "task done" : "task";
    taskDiv.setAttribute("data-id", task.id);
    taskDiv.appendChild(document.createTextNode(task.title));

    // Create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "del";
    deleteBtn.appendChild(document.createTextNode("Delete"));
    taskDiv.appendChild(deleteBtn);

    tasksDiv.appendChild(taskDiv);
  });
};

// Higher-Order Function: Delete Task
const deleteTaskById = (taskId) => {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id !== Number(taskId)); // Filter tasks (immutability)
  renderTasks(arrayOfTasks);
};

// Recursive Function: Mark Task as Completed
const markTaskCompleted = (tasks, taskId) => {
  if (!tasks.length) return [];

  const [first, ...rest] = tasks;
  if (first.id === Number(taskId)) {
    return [{ ...first, completed: !first.completed }, ...markTaskCompleted(rest, taskId)];
  }

  return [first, ...markTaskCompleted(rest, taskId)];
};

// Event Listeners
submit.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    addTaskToArray(input.value.trim()); // Add task
    input.value = ""; // Clear input
  }
});

tasksDiv.addEventListener("click", (e) => {
  const taskId = e.target.parentElement.getAttribute("data-id");

  if (e.target.classList.contains("del")) {
    deleteTaskById(taskId); // Delete task
  } else {
    arrayOfTasks = markTaskCompleted(arrayOfTasks, taskId); // Toggle completion
    renderTasks(arrayOfTasks);
  }
});

