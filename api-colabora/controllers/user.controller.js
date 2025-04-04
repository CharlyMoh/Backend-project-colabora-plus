const User = require('../models/user.model');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // excluye contraseña
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al recuperar los usuarios: " + error.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al recuperar el usuario: " + error.message });
  }
};

// Crear usuario
const createUser = async (req, res) => {
  try {
    const { name, email, password, rol } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const existe = await User.findOne({ email: email.toLowerCase().trim() });
    if (existe) return res.status(409).json({ error: "El correo ya está registrado" });

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim(),
      rol: rol || 'user'
    });

    await newUser.save();

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario: " + error.message });
  }
};

// Actualizar usuario
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar: " + error.message });
  }
};

// Eliminar usuario
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await User.findByIdAndDelete(id);
    if (!eliminado) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar: " + error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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
        rol: user.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el login: " + error.message });
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
