import { User } from './user.model.js';
import { Project } from './project.model.js';


User.hasMany(Project, {
    foreignKey: 'userId'
});

Project.belongsTo(User, {
    foreignKey: 'userId'
});

export { User, Project }; 