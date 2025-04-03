const CalendarEvent = require('../models/calendarEvent.model');

// Obtener todos los eventos de calendario
const getCalendarEvents = async (req, res) => {
    try {
        const events = await CalendarEvent.find()
            .populate('taskId', 'tittle state')
            .populate('projectId', 'nameProject')
            .populate('userId', 'name email');

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar los eventos: " + error.message });
    }
};

// Obtener eventos por usuario
const getEventsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const events = await CalendarEvent.find({ userId })
            .populate('taskId', 'tittle state')
            .populate('projectId', 'nameProject')
            .populate('userId', 'name email');

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar los eventos del usuario: " + error.message });
    }
};

// Crear un evento de calendario
const createCalendarEvent = async (req, res) => {
    try {
        const { title, description, startDate, endDate, taskId, projectId, userId, googleEventId, status } = req.body;

        if (!title || !description || !startDate || !endDate || !userId) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben estar llenos" });
        }

        const newEvent = new CalendarEvent({
            title,
            description,
            startDate,
            endDate,
            taskId,
            projectId,
            userId,
            googleEventId,
            status
        });

        await newEvent.save();
        res.status(201).json({ message: "Evento creado exitosamente", event: newEvent });

    } catch (error) {
        res.status(500).json({ error: "Error al crear el evento: " + error.message });
    }
};

// Actualizar un evento de calendario
const updateCalendarEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await CalendarEvent.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el evento: " + error.message });
    }
};

// Eliminar un evento por ID
const deleteCalendarEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await CalendarEvent.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: "Evento no encontrado" });
        }

        res.status(200).json({ message: "Evento eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el evento: " + error.message });
    }
};

module.exports = {
    getCalendarEvents,
    getEventsByUser,
    createCalendarEvent,
    updateCalendarEventById,
    deleteCalendarEventById
};
