// define task vars


const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');




// Load all event listeners

loadEventListeners();

// Load all event listeners

function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);

    // remove task

    taskList.addEventListener('click', removeTask);

    // clearTask Buttun

    clearBtn.addEventListener('click', clearTask);

    // filter

    filter.addEventListener('keyup', filterTask);

    // localStorage

    document.addEventListener('DOMContentLoaded', getTasks);
}

function getTasks() {
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task) {
        // create li emelent
        const li = document.createElement('li');

        // add a class
        li.className = 'collection-item';

        // create text node and append to li
        li.appendChild(document.createTextNode(task));

        // create a link

        const link = document.createElement('a');

        // class add link

        link.className = 'delete-item secondary-content';

        // add html icon

        link.innerHTML = '<i class="fa fa-remove"></i>';

        // append link

        li.appendChild(link);

        // append li tu ui

        taskList.appendChild(li);

    })
}

//Add Task

function addTask(e) {
    if (taskInput.value === '') {
        confirm('Your Task Is Empty');
    } else {
        console.log(`task add`)
    }

    // create li emelent
    const li = document.createElement('li');

    // add a class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create a link

    const link = document.createElement('a');

    // class add link

    link.className = 'delete-item secondary-content';

    // add html icon

    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append link

    li.appendChild(link);

    // append li tu ui

    taskList.appendChild(li);

    // taskLocalSalerttorage

    taskStoreLocalStorage(taskInput.value);

    // clear btn

    taskInput.value = '';

    e.preventDefault();

}

// local storage

function taskStoreLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// single remove task
function removeTask(e) {

    //console.log(e.target);
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure')) {
            e.target.parentElement.parentElement.remove();


            //remove local storage
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeFromLocalStorage(taskItem) {
    console.log(taskItem);
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
// clear all Task in Buttun

function clearTask() {
    // innerHTML 1 way
    //taskList.innerHTML = '';

    // Faster Way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // create function veriable
    clearTaskFromLocalStorage();
}
// clearTaskFromLocalStorage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}
// filter

function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

//localStorage