document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const rider = {
        nombre: formData.get('riderNombre'),
        apellido1: formData.get('riderApellido1'),
        apellido2: formData.get('riderApellido2'),
        fecha_nacimiento: formData.get('riderFechaNacimiento'),
        foto: formData.get('riderFoto')
    };

    const acudiente = {
        nombre: formData.get('acudienteNombre'),
        apellido1: formData.get('acudienteApellido1'),
        apellido2: formData.get('acudienteApellido2'),
        email: formData.get('acudienteEmail'),
        celular: formData.get('acudienteCelular')
    };

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rider, acudiente })
    });

    const result = await response.json();
    alert(result.message || result.error);
});
