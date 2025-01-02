import Sequelize from 'sequelize';

export const sequelize = new Sequelize('codigoark', 'postgres', 'mao9684',{
    dialect: 'postgres',
    host: 'localhost'
});