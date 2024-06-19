const authenticateUser = async (nombre_Usuario, contrasena, setRol) => {
    const formData = { nombre_Usuario, contrasena };

    try {
        const response = await fetch('http://localhost:5000/crud/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const { rol } = await response.json();
            setRol(rol);
            localStorage.setItem('userRol', rol);
            return 'El usuario se ha iniciado sesión exitosamente';
        } else {
            return '¡Credenciales incorrectas!';
        }
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        return 'Error al procesar la solicitud';
    }
};

module.exports = { authenticateUser };
