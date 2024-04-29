const { Sequelize } = require('sequelize');
const fs = require('fs')
const path = require('path');
require('dotenv').config();

const {
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
} = process.env;


const sequelize = new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false,
  native: false,
  ssl:false,
  // dialectOptions: {
  //   ssl: {
  //     rejectUnauthorized: false
  //   },
  // },
  pool: {
    max: 10055,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

const basename = path.basename(__filename);


fs.readdirSync(path.join(__dirname, '/models'))
.filter((file)=>{
  const modelDefiner = require(path.join(__dirname, '/models', file));
  modelDefiner(sequelize)
})



const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Psicologos } = sequelize.models
const { Pacientes } = sequelize.models

const { Pool } = require('pg')

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT, 
  // ssl: {
  //   rejectUnauthorized: false
  // }
})

pool.connect((err, client)=>{
  if(err){
    console.error('Error al conectar con la base de datos', err)
  } else {
    console.log('Conectado a la base de datos')
    client.release()
  }
})

pool.on('error', (err)=>{
  console.error('Error al conectar con la base de datos', err)
})

Psicologos.hasMany(Pacientes, {
  foreignKey: 'uid',
  sourceKey: 'uid'
});

Pacientes.belongsTo(Psicologos, {
  foreignKey: 'uid',
  targetKey: 'uid'
});



module.exports = { ...sequelize.models, Psicologos, Pacientes, conn: sequelize };
