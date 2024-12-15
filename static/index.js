// Se agrega un evento que escucha el envío del formulario
document.querySelector('form').addEventListener('submit', async (e) => {
    // Se previene el comportamiento por defecto de enviar el formulario
    e.preventDefault();

    // Se crea un objeto FormData con los datos del formulario
    const formData = new FormData(e.target);

    // Se construye un objeto 'rider' que contiene los datos del corredor
    const rider = {
        nombre: formData.get('riderNombre'), // Se obtiene el valor del campo 'riderNombre'
        apellido1: formData.get('riderApellido1'), // Se obtiene el valor del campo 'riderApellido1'
        apellido2: formData.get('riderApellido2'), // Se obtiene el valor del campo 'riderApellido2'
        fecha_nacimiento: formData.get('riderFechaNacimiento'), // Se obtiene el valor del campo 'riderFechaNacimiento'
        foto: formData.get('riderFoto') // Se obtiene el valor del campo 'riderFoto' //Esto debe ser procesado adecuadamente
    };

    // Se construye un objeto 'acudiente' que contiene los datos del acudiente
    const acudiente = {
        nombre: formData.get('acudienteNombre'), // Se obtiene el valor del campo 'acudienteNombre'
        apellido1: formData.get('acudienteApellido1'), // Se obtiene el valor del campo 'acudienteApellido1'
        apellido2: formData.get('acudienteApellido2'), // Se obtiene el valor del campo 'acudienteApellido2'
        email: formData.get('acudienteEmail'), // Se obtiene el valor del campo 'acudienteEmail'
        celular: formData.get('acudienteCelular') // Se obtiene el valor del campo 'acudienteCelular'
    };

    // Se realiza una solicitud POST al servidor con los datos del 'rider' y 'acudiente'
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rider, acudiente })
        });

        // Se espera la respuesta en formato JSON
        const result = await response.json();
        if (response.ok) {
            // Si la respuesta es exitosa, se muestra un mensaje de éxito
            alert("Registro exitoso");
        } else {
             // Si no es exitosa, se muestra el error recibido en el servidor
            alert("Error: " + result.error);
        }
    } catch (error) {
        alert("Error en la conexión: " + error.message);
    }
});