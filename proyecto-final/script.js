let currentUserRole = '';
let registeredUsers = [];

function showOptions(role) {
    currentUserRole = role;
    document.getElementById('roleTitle').textContent = `Opciones para ${role.charAt(0).toUpperCase() + role.slice(1)}`;
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('options').classList.remove('hidden');
}

function showRegisterForm() {
    document.getElementById('options').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

function showLoginForm() {
    document.getElementById('options').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

function saveData() {
    const name = document.getElementById('name').value;
    const cedula = document.getElementById('cedula').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    registeredUsers.push({ name, cedula, email, password, role: currentUserRole });

    alert(`Datos guardados: ${name}, ${cedula}, ${email}`);

    document.getElementById('name').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    goBack();
}

function login() {
    const username = document.getElementById('username').value;
    const userPassword = document.getElementById('userPassword').value;

    const user = registeredUsers.find(user => user.name === username && user.password === userPassword && user.role === currentUserRole);

    if (user) {
        if (currentUserRole === 'admin') {
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');
            populateAdminTable();
        } else {
            document.getElementById('userName').textContent = username;
            document.getElementById('loginForm').classList.add('hidden');
            document.getElementById('userDashboard').classList.remove('hidden');
        }
    } else {
        alert('Invalid credentials or user not registered');
    }

    document.getElementById('username').value = '';
    document.getElementById('userPassword').value = '';
}

function populateAdminTable() {
    const adminTableBody = document.getElementById('adminTableBody');
    adminTableBody.innerHTML = '';

    const sampleData = [
        { name: 'Juan Pérez', codigo: 'a1', email: 'juan@example.com', State: 'entregado', Date: '12/11/23' },
        { name: 'Ana Gómez', codigo: 'c5', email: 'ana@example.com', State: 'pendiente', Date: '9/7/23' },
        { name: 'Carlos Ruiz', codigo: 'h7', email: 'carlos@example.com', State: 'pendiente', Date: '9/9/23' },
        { name: 'Laura Torres', codigo: 'a6', email: 'laura@example.com', State: 'entregado', Date: '23/3/23' }
    ];

    sampleData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.codigo}</td>
            <td>${user.email}</td>
            <td>${user.State}</td>
            <td>${user.Date}</td>
        `;
        adminTableBody.appendChild(row);
    });
}

function submitInfo() {
    const code = document.getElementById('code').value;
    const city = document.getElementById('city').value;

    if (!code || !city) {
        alert('Please fill in all fields');
        return;
    }

    const userInfoDisplay = document.getElementById('userInfoDisplay');
    if (code === 'a1') {
        userInfoDisplay.innerHTML = `
            Código: ${code}<br>
            Ciudad: ${city}<br>
            ¡Ganaste!
        `;
    } else {
        userInfoDisplay.innerHTML = `
            Código: ${code}<br>
            Ciudad: ${city}<br>
            Suerte para la próxima, sigue intentando.
        `;
    }

    alert(`Código: ${code}, Ciudad: ${city}`);

    document.getElementById('code').value = '';
    document.getElementById('city').value = '';
}

function goBack() {
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('options').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('userDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
}

function logout() {
    goBack();
}