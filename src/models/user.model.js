import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Project } from './project.model.js';

export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

User.hasMany(Project, {
    foreignKey: 'userId',
    sourceKey: 'id'
});

Project.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id'
});