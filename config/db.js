//import 'dotnev/config'
require('dotenv').config();

const mysql = require('mysql2')
//Datos de conexión para pool
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.HOST,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
//Check de conexión
 const pool = mysql.createPool(config);
 handleDisconnect(pool);

//Se exporta pool para solicitudes
module.exports = { pool: pool };

function handleDisconnect(client) {
  client.on('error', function (error) {
    if (!error.fatal) return;
    if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

    console.log('> Re-connecting lost MySQL connection: ' + error.stack);

    mysqlClient = mysql.createPool(config);
    handleDisconnect(mysqlClient);
    mysqlClient.connect();
  });
};
