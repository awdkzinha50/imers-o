import express from "express";
import routes from "./src/routes/postsRoutes.js";


// Importa as dependências necessárias: o framework Express.js para criar o servidor e a função conectarAoBanco para estabelecer a conexão com o banco de dados.


// Este trecho de código JavaScript define um array (lista) chamado posts. Cada elemento desse array representa um post, que, nesse caso, possui duas propriedades:
// descricao: Uma string que descreve o post. No exemplo, a descrição é "Uma foto teste".

// imagem: Uma string que representa o URL de uma imagem. O URL https://placecats.com/millie/300/150 leva a uma imagem aleatória de um gato, com dimensões 300x150 pixels.


// >  objeto : conjunto de chave/ valor (dicionário)

// Cria uma instância do aplicativo Express, que será o ponto de partida para a criação do servidor.

const app = express();
app.use(express.static("uploads")) // servir arquivos estáticos
routes(app)

app.listen(3000, () => {
    console.log("Servidor escutando...");
});


// função recebe um número de id, entra dentro do array de posts, usa um método da linguagem javascript 
// para entrar dentro do array e ele vai entrar em cada um dos objetos que está alojado dentro do array

// identificação de variável feita através do ID.

// código HTTP  ->  código númerico associado ao texto "res.status(200).send"

// array -> permite guardar uma grande quantidade de dados em um lugar só

// Como a /API funciona -> recebe uma requisição, aciona o Back-end e devolve em .Json para quem precisa consumir.

// Banco  MongoDB (banco de dados) => muito usado em /API
// utilização de um recurso de Nuvem
// .env => variável de ambiente (proteção de dados para não serem expostos)

// node --watch --env-file=.env server.js = passagem do comando para o node executar o servidor 
// em pé e recarregá-lo mediante a função "watch" e o arquivo de variáveis de ambiente (.env) para chamá-lo
// para no final chamá-lo na execução do server.js
// src => código fonte
// async await (solicita função e continua o processamento)