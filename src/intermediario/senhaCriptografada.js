const bcrypt = require('bcrypt');
const pool = require('../conexao')

const criptografarSenha = async (req, res, next) => {
    try {
        const { senha } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        req.senhaCriptografada = senhaCriptografada;

        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ mensagem: 'erro interno do servidor ' })

    }

}

module.exports = { criptografarSenha };
