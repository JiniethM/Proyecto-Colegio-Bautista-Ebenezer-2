const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'bd_cbe',
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

const EstadísticaDt = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'bd_cbe_DM1',
});

EstadísticaDt.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos en la conexión del DataMart:', err);
  } else {
    console.log('Conexión exitosa a la base de datos en la base de datos DataMart');
  }
});

// Configuración de CORS
app.use(cors());

// Agregar configuración para analizar solicitudes JSON
app.use(express.json());

const crudRoutes = require('./Routes/crudRoutes')(db);
app.use('/crud', crudRoutes);

const crudRoutesDt = require('./Routes/crudRoutesDt')(EstadísticaDt); 
app.use('/crudDt', crudRoutesDt);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});










