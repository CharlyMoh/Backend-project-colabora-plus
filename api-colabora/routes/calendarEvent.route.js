const express = require('express');
const router = express.Router();
const {
    getCalendarEvents,
    getEventsByUser,
    createCalendarEvent,
    updateCalendarEventById,
    deleteCalendarEventById
} = require('../controllers/calendarEvent.controller'); 

// Obtener todos los eventos
router.get('/all', getCalendarEvents);

// Obtener eventos de un usuario por su ID
router.get('/byUser/:userId', getEventsByUser);

// Crear un nuevo evento
router.post('/add', createCalendarEvent);

// Actualizar un evento por ID
router.put('/update/:id', updateCalendarEventById);

// Eliminar un evento por ID
router.delete('/delete/:id', deleteCalendarEventById);

module.exports = router;
