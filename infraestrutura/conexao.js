const mysql = require('mysql');

const conexao = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b86a6d3beb0e3c',
  password: 'a6f5a083',
  database: 'heroku_517f83d60128043',
});

module.exports = conexao;
