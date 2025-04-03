const express = require('express');
const router = express.Router();
const {
    getNotifications,
    getNotificationsByUser,
    createNotification,
    updateNotificationById,
    deleteNotificationById
} = require('../controllers/notification.controller'); 

// Obtener todas las notificaciones
router.get('/all', getNotifications);

// Obtener notificaciones de un usuario por su ID
router.get('/byUser/:userId', getNotificationsByUser);

// Crear una nueva notificación
router.post('/add', createNotification);

// Actualizar una notificación por ID
router.put('/update/:id', updateNotificationById);

// Eliminar una notificación por ID
router.delete('/delete/:id', deleteNotificationById);

module.exports = router;
