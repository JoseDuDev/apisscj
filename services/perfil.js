const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const nome_tabela = "perfil";

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT perfilId, tipo 
    FROM ${nome_tabela} LIMIT ?,?`, [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(perfil) {
    const result = await db.query(
        `INSERT INTO ${nome_tabela} 
        (tipo) 
        VALUES 
        (?)`, [
            perfil.tipo
        ]
    );

    let message = 'Erro na criação de perfil';

    if (result.affectedRows) {
        message = 'perfil criada com sucesso';
    }

    return { message };
}

async function update(id, perfil) {
    const result = await db.query(
        `UPDATE ${nome_tabela}
    SET tipo=?
    WHERE perfilId=?`, [
            perfil.tipo, id
        ]
    );

    let message = 'Erro na atualização perfil';

    if (result.affectedRows) {
        message = 'perfil atualizado com sucesso ';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM ${nome_tabela} WHERE perfilId=?`, [id]
    );

    let message = 'Erro ao deletar perfil';

    if (result.affectedRows) {
        message = 'perfil deletado com sucesso';
    }

    return { message };
}

async function get(id) {
    const rows = await db.query(
        `SELECT perfilId, tipo
    FROM ${nome_tabela} WHERE perfilId=?`, [id]
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

module.exports = {
    get,
    getMultiple,
    create,
    update,
    remove
}