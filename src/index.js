import { sequelize } from './database/database.js';
import './models/associations.js';
import app from './app.js';

async function main() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced');
        app.listen(4000, () => {
            console.log('App listening on port 4000!');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();