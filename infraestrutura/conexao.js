const mysql = require('mysql');

const conexao = mysql.createConnection({
  host: 'i0rgccmrx3at3wv3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user: 'r7noj3p30blo4hnc',
  password: 'qv3xukgfzdejxl3l',
  database: 'ttcq0p163h9lwuk7',
});

module.exports = conexao;
