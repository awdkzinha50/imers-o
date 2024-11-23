import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)
// Estabelece a conexão com o banco de dados, 
//utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO. 
//O resultado da conexão é armazenado na variável conexao.

// Define uma função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersão-instabytes" e a coleção "posts".
    const db = conexao.db("imersão-instabytes");
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção "posts".
    return colecao.find().toArray()
}

export async function criarPost(novoPost) {
    // Seleciona o banco de dados "imersão-instabytes" e a coleção "posts".
    const db = conexao.db("imersão-instabytes");
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção "posts".
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersão-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}