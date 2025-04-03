const mongoose = require('mongoose');
const NotificationSchema = mongoose.Schema({
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    notificationType: {
        type: String,
        enum: ['Recordatorio', 'Cambio de estado', 'Asignación de tarea'], 
        required: true 
    },
    state: {
        type: String,
        enum: ['Leída', 'No leída'],
        required: true
    },
})

const Notificaction = mongoose.model('Notification', NotificationSchema);
module.exports = Notificaction;