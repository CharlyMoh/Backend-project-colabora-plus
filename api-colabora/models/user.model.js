const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    notifications: {
        email: {
            type: Boolean,
            default: true // Notificaciones por email activadas por defecto
        },
        push: {
            type: Boolean,
            default: true // Notificaciones push activadas por defecto
        }
    },
    profilePicture: {
        // URL de la imagen de perfil
        type: String, 
        default: "default-profile.png"
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;