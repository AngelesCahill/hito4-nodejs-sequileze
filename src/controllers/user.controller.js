import { User } from "../models/user.model.js";
import { Project } from "../models/project.model.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            const newUser = await User.create({ name, email, password });
            res.status(201).json(newUser);
        } else {
            res.status(400).json({
                message: 'Invalid data'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByPk(id);
        if (user) {
            user.name = name;
            user.email = email;
            user.password = password;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: 'Se ha eliminado el usuario con id ' + id });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};