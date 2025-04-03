const Task = require('../models/task.model');

// Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedProject').populate('assignedUser');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar las tareas: " + error.message });
    }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedProject').populate('assignedUser');
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar la tarea: " + error.message });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    try {
        const { tittle, assignedProject, assignedUser, state, dueDate } = req.body;

        // Validaciones de campos requeridos
        if (!tittle || !assignedProject || !assignedUser || !state || !dueDate) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validar estado permitido
        const allowedStates = ['Pendiente', 'En progreso', 'Completado'];
        if (!allowedStates.includes(state)) {
            return res.status(400).json({ error: "Estado no válido" });
        }

        // Crear y guardar la tarea
        const newTask = new Task({
            tittle: tittle.trim(),
            assignedProject,
            assignedUser,
            state,
            dueDate
        });

        await newTask.save();
        res.status(201).json({ message: "Tarea creada exitosamente", task: newTask });

    } catch (error) {
        res.status(500).json({ error: "Error al crear la tarea: " + error.message });
    }
};

// Actualizar una tarea por ID
const updateTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la tarea: " + error.message });
    }
};

// Eliminar una tarea por ID
const deleteTaskById = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tarea: " + error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById
};
