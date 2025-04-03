const mongoose = require('mongoose');
const CalendarEventSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true },
    taskId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Task", 
        required: false 
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: false 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    googleEventId: { 
        // ID del evento en Google Calendar
        type: String, 
        required: false 
    }, 
    status: { 
        type: String, 
        enum: ["pendiente", "sincronizado", "cancelado"], 
        default: "pendiente" 
    }
});

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema)
module.exports = CalendarEvent;
