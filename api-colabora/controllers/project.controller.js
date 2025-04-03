const Project = require('../models/project.model');

// Obtener todos los proyectos
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('teammates', 'name email');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar los proyectos: " + error.message });
    }
};

// Obtener un proyecto por ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('teammates', 'name email');
        if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: "Error al recuperar el proyecto: " + error.message });
    }
};

// Crear un proyecto
const createProject = async (req, res) => {
    try {
        const { nameProject, description, userInCharge, teammates, state } = req.body;

        if (!nameProject || !description || !userInCharge || !state) {
            return res.status(400).json({ error: "Todos los campos obligatorios deben estar llenos" });
        }

        const newProject = new Project({
            nameProject: nameProject.trim(),
            description: description.trim(),
            userInCharge: userInCharge.trim(),
            teammates,
            state: state.trim()
        });

        await newProject.save();
        res.status(201).json({ message: "Proyecto creado exitosamente", project: newProject });

    } catch (error) {
        res.status(500).json({ error: "Error al crear el proyecto: " + error.message });
    }
};

// Actualizar un proyecto por ID
const updateProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedProject) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el proyecto: " + error.message });
    }
};

// Eliminar un proyecto por ID
const deleteProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: "Proyecto no encontrado" });
        }
        res.status(200).json({ message: "Proyecto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el proyecto: " + error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProjectById,
    deleteProjectById
};
