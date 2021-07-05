const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const nome_tabela = "cargo";

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT cargoId, nome 
    FROM ${nome_tabela} LIMIT ?,?`, [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(cargo) {
    const result = await db.query(
        `INSERT INTO ${nome_tabela} 
        (nome) 
        VALUES 
        (?)`, [
            cargo.nome
        ]
    );

    let message = 'Erro na criação de cargo';

    if (result.affectedRows) {
        message = 'Linguagem de programação criada com sucesso';
    }

    return { message };
}

async function update(id, cargo) {
    const result = await db.query(
        `UPDATE ${nome_tabela}
    SET nome=?
    WHERE cargoId=?`, [
            cargo.nome, id
        ]
    );

    let message = 'Erro na atualização cargo';

    if (result.affectedRows) {
        message = 'Cargo atualizado com sucesso ';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM ${nome_tabela} WHERE cargoId=?`, [id]
    );

    let message = 'Erro ao deletar cargo';

    if (result.affectedRows) {
        message = 'Cargo deletado com sucesso';
    }

    return { message };
}

async function get(id) {
    const rows = await db.query(
        `SELECT cargoId, nome
    FROM ${nome_tabela} WHERE cargoId=?`, [id]
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