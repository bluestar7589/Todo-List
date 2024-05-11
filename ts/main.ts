/**
 * this method will return the element with the id name was input
 * @param id the id of element that want to get
 * @returns return the element with the id input
 */
function $(id):Element {
    return document.getElementById(id);
}

window.onload = function() {
    // setup the button click event for add book form
    let addNewTask = $("btnSaveTask") as HTMLButtonElement;
    addNewTask.onclick = savingTask;

    // get all element in the div taskList
    let taskList = $("taskList") as HTMLDivElement;
    // add even onclick for checkbox on the taskList
    taskList.onclick = disableTask;

    // define the list of tasks
    let myToDoList: ToDo[] = [];
    // @ts-ignore
    Cookies.set("toDoList",JSON.stringify(myToDoList));
}

/**
 * To process and saving the task and display on the web pages
 */
function savingTask(): void {
    let taskDetail = $("newTaskInput") as HTMLInputElement;
    //DisplayTask(taskDetail);
    let task = new ToDo();
    task.taskText = taskDetail.value;
    task.isComplete = false;

    // @ts-ignore
    let myToDoList:ToDo[] = JSON.parse(Cookies.get("toDoList")) as ToDo[];
    myToDoList.push(task);
    // @ts-ignore
    Cookies.set("toDoList",JSON.stringify(myToDoList));
    DisplayTask(task);
}

/**
 * To disable the task when the checkbox was checked
 */
function disableTask(): void {
    let taskList = $("taskList") as HTMLDivElement;
    let tasks = taskList.children;
    // @ts-ignore
    let myToDoList:ToDo[] = JSON.parse(Cookies.get("toDoList")) as ToDo[];
    // loop through each task and make the task disable if the checkbox was checked
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i] as HTMLLIElement; // Change the type of 'task' variable to HTMLLIElement
        let chkBox = task.getElementsByTagName("input")[0] as HTMLInputElement;
        if (chkBox.checked) {
            task.style.textDecoration = "line-through";
            // set the task already finish to object
            for (let index = 0; index < myToDoList.length; index++) {
                if (myToDoList[index].taskText == task.textContent.trim()) {
                    myToDoList[index].isComplete = true;
                }
            }
        } else {
            task.style.textDecoration = "none";
            for (let index = 0; index < myToDoList.length; index++) {
                if (myToDoList[index].taskText == task.textContent.trim()) {
                    myToDoList[index].isComplete = false;
                }
            }
        }
    }
    // @ts-ignore
    Cookies.set("toDoList",JSON.stringify(myToDoList));
}

/**
 * This function will display a task on the list with a checkbox
 * @param taskDetail the context of the task
 */
function DisplayTask(task: ToDo):void {
    // create a check box with the context of task details in "taskList" tag
    let taskList = $("taskList");
    let newTask = document.createElement("li");
    let chkBox = document.createElement("input");
    chkBox.type = "checkbox";
    newTask.appendChild(chkBox);
    newTask.innerHTML += " " + task.taskText;
    taskList.appendChild(newTask);
}

// Create a class for ToDo to keep the task
class ToDo {
    // To keep the task context
    taskText:string;
    // To keep the status of the task
    isComplete:boolean;
}