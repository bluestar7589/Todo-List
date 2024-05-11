function $(id) {
    return document.getElementById(id);
}
window.onload = function () {
    let addNewTask = $("btnSaveTask");
    addNewTask.onclick = savingTask;
    let taskList = $("taskList");
    taskList.onclick = disableTask;
};
function savingTask() {
    let taskDetail = $("newTaskInput");
    let task = new ToDo();
    task.taskText = taskDetail.value;
    task.isComplete = false;
    DisplayTask(task);
}
function disableTask() {
    let taskList = $("taskList");
    let tasks = taskList.children;
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let chkBox = task.getElementsByTagName("input")[0];
        if (chkBox.checked) {
            task.style.textDecoration = "line-through";
        }
        else {
            task.style.textDecoration = "none";
        }
    }
}
function DisplayTask(task) {
    let taskList = $("taskList");
    let newTask = document.createElement("li");
    let chkBox = document.createElement("input");
    chkBox.type = "checkbox";
    newTask.appendChild(chkBox);
    newTask.innerHTML += " " + task.taskText;
    taskList.appendChild(newTask);
}
class ToDo {
}
