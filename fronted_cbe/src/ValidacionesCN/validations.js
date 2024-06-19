const validateNombres = (Nombres) => {
  if (!Nombres) {
    return "El campo Nombre es obligatorio";
  } else if (Nombres.length > 50) {
    return "El nombre debe tener como máximo 50 caracteres";
  } else if (!/^[a-zA-Z\s]+$/.test(Nombres)) {
    return "El nombre solo debe contener caracteres alfabéticos y espacios";
  }
  return null;
};

const validateApellidos = (Apellidos) => {
  if (!Apellidos) {
    return "El campo Apellido es obligatorio";
  } else if (Apellidos.length > 50) {
    return "El apellido debe tener como máximo 50 caracteres";
  } else if (!/^[a-zA-Z\s]+$/.test(Apellidos)) {
    return "El apellido solo debe contener caracteres alfabéticos y espacios";
  }
  return null;
};

const validateFechaNacimiento = (Fecha_Nacimiento) => {
  if (!Fecha_Nacimiento) {
    return "El campo Fecha de Nacimiento es obligatorio";
  }
  return null;
};

const validateDireccion = (Direccion) => {
  if (!Direccion) {
    return "El campo Dirección es obligatorio";
  }
  return null;
};

const validateGenero = (Genero) => {
  if (!Genero) {
    return "Debe seleccionar el Género";
  }
  return null;
};

const validateTelefono = (Telefono) => {
  if (!Telefono) {
    return "El campo Teléfono es obligatorio";
  } else if (!/^\d{4}-\d{4}$/.test(Telefono)) {
    return "El formato de teléfono es inválido, debe ser ####-####";
  }
  return null;
};

const validateIDTutor = (ID_Tutor) => {
  if (!ID_Tutor) {
    return "Debe seleccionar un Tutor";
  }
  return null;
};

module.exports = {
  validateNombres,
  validateApellidos,
  validateFechaNacimiento,
  validateDireccion,
  validateGenero,
  validateTelefono,
  validateIDTutor,
};
