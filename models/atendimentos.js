const res = require('express/lib/response');
const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
  lista(res) {
    const sql = 'SELECT * FROM Atendimentos';
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  adiciona(atendimento, res) {
    const sql = 'INSERT INTO Atendimentos SET ?';
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = moment(atendimento.data, 'DD-MM-YYYY').format(
      'YYYY-MM-DD HH:mm:ss',
    );

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);

    const clienteEhValido = atendimento.cliente.length >= 5;

    const erros = [];
    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: 'Data deve ser maior ou igual a data atual',
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: 'Cliente deve ter no mínimo 5 caracteres',
      },
    ];

    validacoes.forEach((val) => {
      if (!val.valido) {
        erros.push(val);
      }
    });

    if (erros.length > 0) {
      res.status(400).json(erros);
    } else {
      const atendimentoComData = { ...atendimento, dataCriacao, data };
      conexao.query(sql, atendimentoComData, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, 'DD-MM-YYYY').format(
        'YYYY-MM-DD HH:mm:ss',
      );
    }

    const sql = `UPDATE Atendimentos SET ? WHERE id = ?`;
    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...valores, id: id });
      }
    });
  }

  deleta(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id =${id}`;
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({
          id: id,
        });
      }
    });
  }

  deletaTodos(res) {
    const sql = 'DELETE FROM Atendimentos';
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res
          .status(200)
          .json({ message: 'Todos os atendimentos foram deletados' });
      }
    });
  }
}

module.exports = new Atendimento();
