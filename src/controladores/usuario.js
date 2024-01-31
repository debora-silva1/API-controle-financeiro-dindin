const pool = require("../conexao")

const cadastrarUsuario = async (req, res) => {
    const { nome, email } = req.body

    try {

        const senhaCriptografada = req.senhaCriptografada;


        if (!nome || !email) {
            res.status(400).json({ mensagem: 'Campos obrigatórios' })
        }

        const { rowCount } = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email])

        if (rowCount.length > 0) {
            res.status(400).json({ mensagem: 'E-mail já cadastrado' })
        }
        const usuario = await pool.query(`
            INSERT into usuarios (nome,email,senha)
            values ($1,$2,$3) 
            returning *`,
            [nome, email, senhaCriptografada]);


        const respostaDoUsuario = {
            id: usuario.rows[0].id,
            nome: usuario.rows[0].nome,
            email: usuario.rows[0].email,

        };

        return res.status(201).json(respostaDoUsuario)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });

    }
}

// const loginUsuario = (req, res) => {

// }

// const detalharPerfilUsuario = (req, res) => {

// }

// const editarPerfilUsuario = (req, res) => {

// }

module.exports = {
    cadastrarUsuario,
    // loginUsuario,
    // detalharPerfilUsuario,
    // editarPerfilUsuario
}