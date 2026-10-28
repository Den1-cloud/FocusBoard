console.log("FocusBoard JavaScript loaded!");
const taskInput = document.querySelector("#tname");
const categoryInput = document.querySelector("#category");
const priorityInput = document.querySelector("#prio");
const taskForm = document.querySelector(".task-form");
const emptyMessage = document.querySelector("#emptyMessage");
const filterButtons = document.querySelectorAll(".filter_group button");
const taskList = document.querySelector(".task-list");
const progressText = document.querySelector(".card h3");
console.log(taskList);
const savedTasks = localStorage.getItem("focusboard-tasks");
const tasks = savedTasks ? JSON.parse(savedTasks) : [];

console.log("Restored tasks:", tasks);

taskForm.addEventListener("submit", function(event) {
event.preventDefault();
    const newTask = {
        name: taskInput.value,
        category: categoryInput.value,
        priority: priorityInput.value,
        completed: false,
    };

tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    updateProgress();
    updateFilter();

emptyMessage.hidden = true;


    console.log(tasks);

});

function renderTask(task) {
const taskItem = document.createElement("div");
taskItem.className = "task-item";
task.element = taskItem;

const taskName = document.createElement("span");
taskName.className = "task-name";
taskName.textContent = task.name;

if (task.completed === true) {
taskName.style.textDecoration = "line-through";
}

const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.appendChild(taskName);
    taskItem.appendChild(taskInfo);

const taskMeta = document.createElement("span");
taskMeta.className = "task-meta";
taskMeta.textContent = task.category + " · " + task.priority;

    console.log(taskItem);
const completeButton = document.createElement("button");
completeButton.textContent = task.completed ? "Undo" : "Done";
taskInfo.appendChild(taskMeta);
taskItem.appendChild(completeButton);

const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
taskItem.appendChild(deleteButton);

taskList.appendChild(taskItem);

completeButton.addEventListener("click", function() {
task.completed = !task.completed;
updateProgress();
saveTasks();

if (task.completed === true) {
taskName.style.textDecoration = "line-through";
completeButton.textContent = "Undo";
    }

else {
taskName.style.textDecoration = "none"
completeButton.textContent = "Done";
    }
        updateFilter();
        console.log(task);
    });

deleteButton.addEventListener("click", function() {
    const index = tasks.indexOf(task);
tasks.splice(index, 1);
        saveTasks();
taskItem.remove();
        updateProgress();
        console.log("Array entfernt?")
    });
}
function saveTasks() {
    const tasksToSave = tasks.map(function(task) {
return {
            name: task.name,
            category: task.category,
            priority: task.priority,
            completed: task.completed
        };
    });

    localStorage.setItem("focusboard-tasks", JSON.stringify(tasksToSave));
}

function updateProgress() {
    const completedTasks = tasks.filter(function(task) {
        return task.completed === true;
    });

    progressText.textContent =
        `${completedTasks.length} of ${tasks.length} tasks completed`;

    emptyMessage.hidden = tasks.length > 0;
}

function updateFilter() {
    const activeButton = document.querySelector(".filter_group button.active");
    const selectedFilter = activeButton.textContent.trim().toLowerCase();

tasks.forEach(function(task) {
if (selectedFilter === "all") {
task.element.hidden = false;
        } else if (selectedFilter === "open") {
task.element.hidden = task.completed;
        } else if (selectedFilter === "done") {
task.element.hidden = !task.completed;
        }
    });
}

filterButtons.forEach(function(button) {
button.addEventListener("click", function() {

filterButtons.forEach(function(item) {
item.classList.remove("active");
        });

button.classList.add("active");
        updateFilter();

        console.log(button.textContent);
    });
});

tasks.forEach(function(task) {
    renderTask(task);
});

emptyMessage.hidden = tasks.length > 0;
updateFilter();
updateProgress();

console.log(taskForm);
