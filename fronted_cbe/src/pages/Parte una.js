import React from 'react';
import AsignaturaList from './AsignaturaList';

function ParentComponent() {
    const handleAsignaturaSelect = (id, nombre) => {
        console.log(`Asignatura seleccionada: ${nombre} con ID: ${id}`);
    };

    return (
        <div>
            <h1>Componente Padre</h1>
            <AsignaturaList handleAsignaturaSelect={handleAsignaturaSelect} />
        </div>
    );
}

export default ParentComponent;
