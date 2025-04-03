const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    loginUser
} = require('../controllers/user.controller'); 

// Obtener todos los usuarios
router.get('/all', getUsers);

// Obtener un usuario por ID
router.get('/byId/:id', getUserById);

// Crear un nuevo usuario
router.post('/add', createUser);

// Iniciar sesión (login)
router.post('/login', loginUser);

// Actualizar un usuario por ID
router.put('/update/:id', updateUserById);

// Eliminar un usuario por ID
router.delete('/delete/:id', deleteUserById);

module.exports = router;
