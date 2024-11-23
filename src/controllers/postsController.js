import  {getTodosPosts, criarPost, atualizarPost} from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req , res) {
    // Chama a função getTodosPosts() para obter todos os posts do banco de dados.
    const posts = await getTodosPosts();
   // Envia uma resposta HTTP com status 200 (OK) e o array de posts no formato JSON.
    res.status(200).json(posts);
    }

export async function postarNovoPost(req, res) {
    const novoPost = req.body; // 1. Extrai os dados do novo post do corpo da requisição.
    try {
        const postCriado = await criarPost(novoPost); // 2. Chama a função `criarPost` para salvar o post no banco de dados.
        res.status(200).json(postCriado); // 3. Retorna o post criado com status 200 (sucesso).
    } catch(erro) {
        console.error(erro.message); // 4. Imprime a mensagem de erro no console para depuração.
         res.status(500).json({"Erro":"Falha na requisição."}) // 5. Retorna um erro 500 com uma mensagem genérica.
        }
}

export async function uploadImagem(req, res) {
    const novoPost = { // 1. Cria um objeto para o novo post com informações básicas.
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    
    try {
        const postCriado = await criarPost(novoPost); // 2. Salva o post no banco de dados.
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png` // 3. Cria um novo nome para a imagem.
        fs.renameSync(req.file.path, imagemAtualizada) // 4. Renomeia o arquivo da imagem para o novo nome.
        res.status(200).json(postCriado); // 5. Retorna o post criado com status 200 (sucesso).
    } catch(erro) {
        console.error(erro.message); // 6. Imprime a mensagem de erro no console para depuração.
        res.status(500).json({"Erro":"Falha na requisição."}) // 7. Retorna um erro 500 com uma mensagem genérica.
        }
    }
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, postAtualizado); // 2. Chama a função `criarPost` para salvar o post no banco de dados.
        res.status(200).json(postCriado); // 3. Retorna o post criado com status 200 (sucesso).
    } catch(erro) {
        console.error(erro.message); // 4. Imprime a mensagem de erro no console para depuração.
         res.status(500).json({"Erro":"Falha na requisição."}) // 5. Retorna um erro 500 com uma mensagem genérica.
    }
    }