const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById
} = require('../controllers/task.controller');

// Obtener todas las tareas
router.get('/all', getTasks);

// Obtener una tarea por ID
router.get('/byId/:id', getTaskById);

// Crear una nueva tarea
router.post('/add', createTask);

// Actualizar una tarea por ID
router.put('/update/:id', updateTaskById);

// Eliminar una tarea por ID
router.delete('/delete/:id', deleteTaskById);

module.exports = router;
