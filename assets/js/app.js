const inputTask = document.querySelector('.input-new-task');
const btnAdd = document.querySelector('.btn-add-task');
const ulTasks = document.querySelector('.tasks');


// When Enter pressed:
inputTask.addEventListener('keypress', function(e){
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
        clearInput();
    }
});

// When click on add task
btnAdd.addEventListener('click', (event) => {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    clearInput();
})

// When click in 'Apagar' Delete task
document.addEventListener('click', function (e) {
    const eliminar = e.target;
    if (eliminar.classList.contains('apagar')) {
        eliminar.parentElement.remove();
        saveTasks()
    }
})

function createTask(inputTxt) {
    const li = document.createElement('li');
    li.innerText = inputTxt;
    ulTasks.appendChild(li)
    createDeleteBtn(li)
    saveTasks();
}

function createDeleteBtn (li) {
    li.innerText += ' ';
    const btnDelete = document.createElement('button');
    btnDelete.innerText = 'Apagar'
    btnDelete.setAttribute('class', 'apagar')
    li.appendChild(btnDelete);
}

function saveTasks() {
    const liTasks = ulTasks.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('Apagar', '').trim(); //.trim remove espaços finais
        listaDeTarefas.push(taskText);
    }
    const taskJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tasks', taskJSON);
}

function addTaskSaved() {
    const task = localStorage.getItem('tasks');
    const listaDeTarefas = JSON.parse(task);

    for (let task of listaDeTarefas) {
        createTask(task);
    }
}

function clearInput () {
    inputTask.value = '';
    inputTask.focus();
}

addTaskSaved();

