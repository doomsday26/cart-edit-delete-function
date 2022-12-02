const Sequelize= require('sequelize');
const sequelize= new Sequelize('node-complete','root','harsh226748',{
dialect:'mysql',host:'localhost'})

module.exports= sequelize;