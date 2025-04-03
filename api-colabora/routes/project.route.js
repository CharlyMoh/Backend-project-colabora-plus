const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProjectById,
    createProject,
    updateProjectById,
    deleteProjectById
} = require('../controllers/project.controller');

// Obtener todos los proyectos
router.get('/all', getProjects);

// Obtener un proyecto por ID
router.get('/byId/:id', getProjectById);

// Crear un nuevo proyecto
router.post('/add', createProject);

// Actualizar un proyecto por ID
router.put('/update/:id', updateProjectById);

// Eliminar un proyecto por ID
router.delete('/delete/:id', deleteProjectById);

module.exports = router;
