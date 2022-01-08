const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');
const app = customExpress();

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    Tabelas.init(conexao);
    Tabelas.criarAtendimento();
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  }
});
