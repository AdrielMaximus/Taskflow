const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const emptyState = document.getElementById('empty-state');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

async function saveTasks() {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks)
        });
    } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    if (taskCount) taskCount.textContent = String(tasks.length);
    if (emptyState) emptyState.style.display = tasks.length ? 'none' : 'block';

    tasks
        .map((task, idx) => ({ task, idx }))
        .reverse()
        .forEach(({ task, idx }) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const span = document.createElement('span');
            span.textContent = task.title || task.text;
            span.className = 'task-text' + (task.done ? ' done' : '');
            span.onclick = () => toggleDone(idx);

            const btn = document.createElement('button');
            btn.className = 'remove-btn';
            btn.innerHTML = '&times;';
            btn.title = 'Remover tarefa';
            btn.onclick = (e) => {
                e.stopPropagation();
                removeTask(idx);
            };

            li.appendChild(span);
            li.appendChild(btn);
            taskList.appendChild(li);
        });

    saveTasks();
}

taskForm.onsubmit = function (e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.unshift({ text, done: false });
    taskInput.value = '';
    renderTasks();
};

function toggleDone(idx) {
    tasks[idx].done = !tasks[idx].done;
    renderTasks();
}

function removeTask(idx) {
    tasks.splice(idx, 1);
    renderTasks();
}
const API_URL = "http://localhost:3000/tasks";
async function loadTasks() {
    const res = await fetch(API_URL);
    tasks = await res.json();
    renderTasks();
}

// Carrega tarefas do backend ao abrir a página
loadTasks();