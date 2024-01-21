const express = require('express');
const dindin = require("../controladores/dindin");

const rotas = express();


rotas.post('/transacao', dindin.cadastrarTransacao)
rotas.get('/transacao/:id', dindin.detalharTransacao)
rotas.delete('/transacao/:id', dindin.removerTransacao)


module.exports = rotas;