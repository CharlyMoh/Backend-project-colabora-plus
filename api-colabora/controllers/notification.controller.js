const Notification = require('../models/notification.model');

// Obtener todas las notificaciones
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().populate('assignedUser', 'name email');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar las notificaciones: " + error.message });
    }
};

// Obtener notificaciones por usuario
const getNotificationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ assignedUser: userId }).populate('assignedUser', 'name email');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar las notificaciones del usuario: " + error.message });
    }
};

// Crear una notificación
const createNotification = async (req, res) => {
    try {
        const { assignedUser, notificationType, state } = req.body;

        if (!assignedUser || !notificationType || !state) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben estar llenos" });
        }

        const newNotification = new Notification({
            assignedUser,
            notificationType,
            state
        });

        await newNotification.save();
        res.status(201).json({ message: "Notificación creada exitosamente", notification: newNotification });

    } catch (error) {
        res.status(500).json({ error: "Error al crear la notificación: " + error.message });
    }
};

// Actualizar el estado de una notificación
const updateNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNotification = await Notification.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedNotification) {
            return res.status(404).json({ message: "Notificación no encontrada" });
        }

        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la notificación: " + error.message });
    }
};

// Eliminar una notificación por ID
const deleteNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);

        if (!notification) {
            return res.status(404).json({ message: "Notificación no encontrada" });
        }

        res.status(200).json({ message: "Notificación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la notificación: " + error.message });
    }
};

module.exports = {
    getNotifications,
    getNotificationsByUser,
    createNotification,
    updateNotificationById,
    deleteNotificationById
};
