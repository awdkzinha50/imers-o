import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos usando o multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Armazena os arquivos na pasta 'uploads'
    },
    // Define o nome do arquivo a ser salvo
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Mantém o nome original do arquivo
    }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
    app.use(express.json()); // Adiciona um middleware para analisar o corpo das requisições que contêm JSON e torná-lo acessível na propriedade req.body.]
    // Define uma rota GET para a URL "/posts". Quando uma requisição GET é feita para essa URL, esta função é executada.]
    app.use(cors(corsOptions));
    app.get("/posts" , listarPosts);
    // Rota para criar um post;
    app.post("/posts", postarNovoPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost )
}

export default routes;

// verbos HTTP:
// ações que são comuns em todos os sistemas:
// 1 => Pega dados de um sistema e exibe na tela; (Criar(post))
// 2 => Cria um novo 'comentário'/ manda um novo registro que vai ser salvo no banco e acessado no registro; (Ler(get))
// 3 => Atualiza um registro; (atualizar(put))
// 4 => Deleta um registro (deletar(delete))