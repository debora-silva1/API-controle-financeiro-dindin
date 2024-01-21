const pool = require("../conexao")


const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        res.status(400).json({ mensagem: ' Todos os campos obrigatórios devem ser informados' })
        return
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        res.status(400).json({ mensagem: 'tipo deve ser entrada ou saida' })
        return
    }

    const { rowCount } = await pool.query(`SELECT * FROM categorias WHERE id=$1`, [categoria_id]);

    if (rowCount == 0) {
        res.status(400).json({ mensagem: 'Categoria não existe!' })
        return
    }

    const q = `INSERT INTO transacoes (tipo, descricao, valor, data, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const { rows } = await pool.query(q, [tipo, descricao, valor, data, categoria_id]);

    res.status(201).json({ ...rows[0] })
}


const detalharTransacao = async (req, res) => {
    const { id } = req.params

    const { rowCount } = await pool.query(`SELECT FROM transacoes WHERE id = $1`, [id])

    if (rowCount === 0) {
        return res.status(400).json({ mensagem:})
    }
}

const atualizarTransacao = async (req, res) => {
    const { id } = req.params
    const { descricao, valor, data, categoria_id, tipo } = req.body

    if (!id) {
        return res.status(400).json({ mensagem: ' Campo ID obrigatório' })
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Todos campos obrigatórios devem ser informados!' })

    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json({ mensagem: ' tipo deve ser entrada ou saida' })
    }

    const { rowCount } = await pool.query(`SELECT FROM transacao WHERE id=$1`, [id])

    if (rowCount == 0) {
        return res.status(400).json({ mensagem: 'Transação não encontrada.' })
    }

    const query = `UPDATE transacao SET 
                    descricao = $1,
                    valor = $2,
                    data = $3,
                    categoria_id = $4,
                    tipo = $5;`

    const { rows } = await pool.query(query, [descricao, valor, data, categoria_id, tipo])

    return res.status(200).json({ ...rows[0] })

}

const removerTransacao = async (req, res) => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({ mensagem: 'Campo id obrigatório' })
    }

    const { rowCount } = await pool.query(`SELECT FROM transacao WHERE id=$1`, [id])

    if (rowCount == 0) {
        res.status(400).json({ mensagem: 'Transação não encontrada.' })
        return
    }
}

const extratoTransacoes = async (req, res) => {



}
module.exports = {
    cadastrarTransacao,
    detalharTransacao,
    removerTransacao,
}