const express = require('express');
const transacoes = require("../controladores/transacoes");
const { cadastrarUsuario } = require("../controladores/usuario")
const categoria = require("../controladores/categorias");
const { criptografarSenha } = require('../intermediario/senhaCriptografada');


const rotas = express();

rotas.post('/usuario', criptografarSenha, cadastrarUsuario)

rotas.post('/transacao', transacoes.cadastrarTransacao)
rotas.get('/transacao/:id', transacoes.detalharTransacao)
rotas.delete('/transacao/:id', transacoes.removerTransacao)


module.exports = rotas;