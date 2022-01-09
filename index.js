const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');
const app = customExpress();

const port = process.env.PORT || 3000;

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    Tabelas.init(conexao);
    Tabelas.criarAtendimento();
    app.listen(port, () => {
      console.log('Servidor rodando na porta 3000');
    });
  }
});
