const express = require('express');
const mongoose = require('mongoose');

// Importando librería CORS
const cors = require('cors');

const app = express();
// Agregando el parser JSON de express
app.use(express.json());
// Agregando el middleware de CORS para consumo de APIs en el mismo origen
app.use(cors());

// Importación de rutas
const userRoute = require('./routes/user.route');
const taskRoute = require('./routes/task.route');
const projectRoute = require('./routes/project.route');
const notificationRoute = require('./routes/notification.route');
const calendarEventRoute = require('./routes/calendarEvent.route');

// Endpoints 
app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/projects', projectRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/calendars', calendarEventRoute);


// Ruta por defecto
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de APIs version 1.0.0');
})

// Tareas CRUD y sus métodos
// C - Create -> post
// R - Recuperación -> get
// U - update -> put
// D - delete -> delete


// Realizar petición de conexión a mongodb
mongoose.connect('mongodb://localhost:27017/DB_ColaboraPlus')
.then( () => {
    console.log('Se estableció la conexión a base de datos exitosamente');
    app.listen( 3000, () => {
        console.log('Servidor trabajando en el puerto 3000');
    });
})
.catch( () => console.log('Ocurrió un error en la conexión a la base de datos') );
