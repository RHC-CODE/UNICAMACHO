// scripts.js

// Función para simular la llegada de datos IoT
function obtenerDatos() {
    // Simulación de datos para agua y gas
    const flujoAgua = (Math.random() * 10).toFixed(2); // Flujo en L/min
    const flujoGas = (Math.random() * 5).toFixed(2);  // Flujo en m³/h

    // Actualizar la interfaz con los nuevos datos
    document.getElementById('flujo-agua').textContent = `${flujoAgua} L/min`;
    document.getElementById('flujo-gas').textContent = `${flujoGas} m³/h`;

    // Actualizar el estado de los sensores
    document.getElementById('estado-agua').textContent = flujoAgua > 0 ? 'Activo' : 'Inactivo';
    document.getElementById('estado-gas').textContent = flujoGas > 0 ? 'Activo' : 'Inactivo';
}

// Simulación cada 5 segundos
setInterval(obtenerDatos, 5000);

// Llamada inicial para mostrar los datos al cargar la página
obtenerDatos();
