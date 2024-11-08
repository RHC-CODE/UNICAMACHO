const users = {
    'Rober': 'admin1',
    'user': 'admin',
    '1':'1'    
};

const todos = JSON.parse(localStorage.getItem('todos')) || [];

document.getElementById('login-form').style.display = 'block';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('todo-app').style.display = 'block';
        render();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
}

function logout() {
    document.getElementById('todo-app').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Ocultar todas las secciones de tareas
    const sections = document.querySelectorAll('.task-section');
    sections.forEach(s => s.style.display = 'none');
}

function showSection(section) {
    const sections = document.querySelectorAll('.task-section');
    sections.forEach(s => s.style.display = 'none'); // Oculta todas las secciones
    document.getElementById(section).style.display = 'block'; // Muestra la sección seleccionada
    render(); // Renderiza la lista de tareas si es necesario
}

function ocultarInformacion(event) {
    const sectionId = event.target.getAttribute('data-section');
    document.getElementById(sectionId).style.display = 'none';
}

function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value.trim();
    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;
    const categorySelect = document.getElementById('category-select');
    const category = categorySelect.value;

    if (title && dueDate && category) {
        todos.push({ title: title, dueDate: dueDate, category: category });
        localStorage.setItem('todos', JSON.stringify(todos));
        render();

        // Limpiar los campos
        textbox.value = '';
        datePicker.value = '';
        categorySelect.selectedIndex = 0; // Reiniciar selección
        
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function deleteSelected() {
    const checkboxes = document.querySelectorAll('.delete-checkbox');
    const indicesToDelete = [];

    // Recopilar los índices de las tareas seleccionadas para eliminar
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            indicesToDelete.push(index);
        }
    });

    // Eliminar las tareas desde el final hacia el principio para evitar problemas de reindexación
    indicesToDelete.sort((a, b) => b - a).forEach(index => {
        todos.splice(index, 1);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    render();
    showSection('delete-tasks'); // Regresa a la sección de eliminar tareas
}

function render() {
    // Resetear lista de ver tareas
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    // Resetear lista de eliminar tareas
    const deleteList = document.getElementById('delete-list');
    deleteList.innerHTML = '';
    // Ocultar mensajes de no tareas
    document.getElementById('no-tasks-message').style.display = 'none';
    document.getElementById('no-delete-tasks-message').style.display = 'none';  

    if (todos.length === 0) {
        document.getElementById('no-tasks-message').style.display = 'block';
        document.getElementById('no-delete-tasks-message').style.display = 'block';
        return; // No hay tareas, no hacemos nada más
    }

    // Crear una lista con viñetas para ver tareas
    const ul = document.createElement('ul');
    todos.forEach(function (todo, index) {
        const li = document.createElement('li');
        li.innerText = `${todo.title} - ${todo.dueDate} (${todo.category})`;
        ul.appendChild(li);

        // Crear una casilla de verificación para eliminar tareas
        const checkboxDelete = document.createElement('input');
        checkboxDelete.type = 'checkbox';
        checkboxDelete.className = 'delete-checkbox';

        // Crear un label para la tarea
        const label = document.createElement('label');
        label.innerText = `${todo.title} - ${todo.dueDate} (${todo.category})`;

        // Añadir a la sección de eliminar tareas
        const deleteElement = document.createElement('div');
        deleteElement.appendChild(checkboxDelete);
        deleteElement.appendChild(label);
        deleteList.appendChild(deleteElement);
    });
    todoList.appendChild(ul);
}


