const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
  adiciona(atendimento, res) {
    const sql = 'INSERT INTO Atendimentos SET ?';
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = moment(atendimento.data, 'DD-MM-YYYY').format(
      'YYYY-MM-DD HH:mm:ss',
    );

    const atendimentoComData = { ...atendimento, dataCriacao, data };
    conexao.query(sql, atendimentoComData, (erro, resultados) => {
      if (erro) res.status(400).json(erro);
      else {
        res.status(201).json(resultados);
      }
    });
  }
}

module.exports = new Atendimento();
