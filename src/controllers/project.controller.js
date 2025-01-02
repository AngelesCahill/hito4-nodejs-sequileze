import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";

export const getProjects = async (req, res) => {    
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findAllProjectsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await Project.findAll({ where: { userId } });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProject = async (req, res) => {
    try {
        const { name, description, img } = req.body;
        const userId = req.userId;

        console.log('Request body:', req.body);
        console.log('User ID from token:', userId);

        // Verificar que tenemos un userId válido
        if (!userId) {
            return res.status(401).json({ 
                message: 'No user ID found in token' 
            });
        }

        // crear el proyecto
        const newProject = await Project.create({ 
            name, 
            description, 
            img,
            userId: userId 
        });

        console.log('Created project:', newProject.toJSON());

        // Verificar que el proyecto se creó correctamente
        const savedProject = await Project.findByPk(newProject.id);
        console.log('Saved project:', savedProject ? savedProject.toJSON() : 'Not found');

        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ 
            message: error.message,
            error: error
        });
    }
};      

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;  // ID del proyecto
        const userId = req.userId;   // ID del usuario del token
        const { name, description, img } = req.body;

        // Buscar el proyecto y verificar que pertenezca al usuario
        const project = await Project.findOne({
            where: { 
                id,
                userId 
            }
        });

        if (!project) {
            return res.status(404).json({ 
                message: 'Proyecto no encontrado o no pertenece al usuario' 
            });
        }

        // Actualizar el proyecto
        await project.update({ 
            name, 
            description, 
            img 
        });

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};      

export const deleteProject = async (req, res) => {  
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (project) {
            await project.destroy();
            res.status(200).json({ message: 'Se ha eliminada el proyecto con id: ' + id });
        } else {
            res.status(404).json({ message: 'Proyecto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
