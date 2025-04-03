const User = require('../models/user.model');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar los usuarios: " + error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar el usuario: " + error.message });
    }
};

// Crear un usuario
const createUser = async (req, res) => {
    try {
        const { name, lastName, nickname, email, password } = req.body;

        // Validación de campos requeridos
        if (!name || !lastName || !nickname || !email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validación del formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Formato de email inválido" });
        }

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({ error: "El correo ya está registrado" });
        }

        // Crear el usuario
        const newUser = new User({
            name: name.trim(),
            lastName: lastName.trim(),
            nickname: nickname.trim(),
            email: email.toLowerCase().trim(),
            password: password.trim(), // ⚠️ Sin encriptar, idealmente deberías encriptarlo.
            notifications: {
                email: true, // Por defecto activado
                push: true
            },
            profilePicture: "default-profile.png"
        });

        await newUser.save();

        // Eliminar la contraseña del objeto de respuesta por seguridad
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: userResponse
        });

    } catch (error) {
        console.error("Error en createUser:", error);
        res.status(500).json({
            error: "Error interno del servidor",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Actualizar un usuario
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario: " + error.message });
    }
};

// Eliminar un usuario
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario: " + error.message });
    }
};

// Autenticación de usuario (Login) sin cifrado de contraseña
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar si el usuario existe
        const user = await User.findOne({ email: email.toLowerCase().trim(), password });
        if (!user) {
            return res.status(401).json({ error: "Credenciales incorrectas" });
        }

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                nickname: user.nickname
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error en el inicio de sesión: " + error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    loginUser
};
