const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  multipleStatements: true
});

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

connection.query(schema, (error, results) => {
  if (error) {
    console.error('Error initializing database:', error.message);
    process.exit(1);
  }

  console.log('Database initialized successfully!');

  connection.end();
});
