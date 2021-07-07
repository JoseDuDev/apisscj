const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const nome_tabela = "usuario";

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT u.usuarioId, u.nome, u.avatar, u.email, u.telefone, u.celular, 
                u.nascimento, u.provedor, u.uid, u.criado, u.alterado, u.perfilId, 
                p.tipo, u.ativo 
        FROM ${nome_tabela} u 
        LEFT JOIN perfil p ON (u.perfilId = p.perfilId)
        LIMIT ?,?`, [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function create(usuario) {
    const sql = `INSERT INTO ${nome_tabela} 
                    (nome, avatar, email, telefone, celular, nascimento, 
                    perfilId, provedor, uid, criado, alterado, ativo) 
                VALUES (   
                    '${usuario.nome}',
                    '${usuario.avatar}',
                    '${usuario.email}',
                    null,
                    null,
                    null,
                    ${usuario.perfilId},
                    '${usuario.provedor}',
                    '${usuario.uid}', 
                    SYSDATE(), 
                    SYSDATE(), 
                    1
                )`;
    console.log(sql);

    let message = 'Erro na criação de usuario';
    try {
        const result = await db.query(sql);

        if (result.affectedRows) {
            message = 'usuario criada com sucesso';
        }
    } catch (e) {
        message += `. | Erro: ${e}`;
    }

    return { message };
}

async function update(id, usuario) {
    const result = await db.query(
        `UPDATE ${nome_tabela}
    SET alterado=SYSDATE(),
        nome=?,
        avatar=?,
        email=?,
        telefone=?,
        celular=?,
        nascimento=?,
        perfilId=?,
        provedor=?,
        uid=?
    WHERE usuarioId=?`, [
            usuario.nome,
            usuario.avatar,
            usuario.email,
            usuario.telefone,
            usuario.celular,
            usuario.nascimento,
            usuario.perfilId,
            usuario.provedor,
            usuario.uid,
            id
        ]
    );

    let message = 'Erro na atualização usuario';

    if (result.affectedRows) {
        message = 'usuario atualizado com sucesso ';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM ${nome_tabela} WHERE usuarioId=?`, [id]
    );

    let message = 'Erro ao deletar usuario';

    if (result.affectedRows) {
        message = 'usuario deletado com sucesso';
    }

    return { message };
}

async function get(id) {
    const rows = await db.query(
        `SELECT u.usuarioId, u.nome, u.avatar, u.email, u.telefone, u.celular, 
        u.nascimento, u.provedor, u.uid, u.criado, u.alterado, u.perfilId, p.tipo, 
        u.ativo 
        FROM ${nome_tabela} u 
        LEFT JOIN perfil p ON (u.perfilId = p.perfilId)
        WHERE u.usuarioId=?`, [id]
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getUID(id) {
    const rows = await db.query(
        `SELECT u.usuarioId, u.nome, u.avatar, u.email, u.telefone, u.celular, 
        u.nascimento, u.provedor, u.uid, u.criado, u.alterado, u.perfilId, 
        u.ativo 
        FROM ${nome_tabela} u 
        WHERE u.uid=?`, [id]
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
    remove,
    getUID
}