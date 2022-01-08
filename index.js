const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const app = customExpress();

conexao.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log('Conexão estabelecida com sucesso.');

    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  }
});
