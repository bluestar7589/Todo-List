function $(id) {
    return document.getElementById(id);
}
window.onload = function () {
    let addNewTask = $("btnSaveTask");
    addNewTask.onclick = savingTask;
    let taskList = $("taskList");
    taskList.onclick = disableTask;
    let myToDoList = [];
    Cookies.set("toDoList", JSON.stringify(myToDoList));
};
function savingTask() {
    let taskDetail = $("newTaskInput");
    let task = new ToDo();
    task.taskText = taskDetail.value;
    task.isComplete = false;
    let myToDoList = JSON.parse(Cookies.get("toDoList"));
    myToDoList.push(task);
    Cookies.set("toDoList", JSON.stringify(myToDoList));
    DisplayTask(task);
    ($("newTaskInput")).value = "";
    ($("newTaskInput")).focus();
}
function disableTask() {
    let taskList = $("taskList");
    let tasks = taskList.children;
    let myToDoList = JSON.parse(Cookies.get("toDoList"));
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let chkBox = task.getElementsByTagName("input")[0];
        if (chkBox.checked) {
            task.style.textDecoration = "line-through";
            for (let index = 0; index < myToDoList.length; index++) {
                if (myToDoList[index].taskText == task.textContent.trim()) {
                    myToDoList[index].isComplete = true;
                }
            }
        }
        else {
            task.style.textDecoration = "none";
            for (let index = 0; index < myToDoList.length; index++) {
                if (myToDoList[index].taskText == task.textContent.trim()) {
                    myToDoList[index].isComplete = false;
                }
            }
        }
    }
    Cookies.set("toDoList", JSON.stringify(myToDoList));
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
