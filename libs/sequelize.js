const { Sequelize } = require('sequelize')

const { config } = require('./../config/config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


//El pooling ya esta implementado por detras en Sequelize
const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  //Cada vez que haga una consulta se verá el resultado en la consola al activar esta opción
  logging: true
});



module.exports = sequelize
