const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const nome_tabela = "pastoral";

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT pastoralId, nome, avatar, descricao, cor, criado, alterado, ativo
    FROM ${nome_tabela} LIMIT ?,?`, [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(pastoral) {
  const result = await db.query(
    `INSERT INTO ${nome_tabela} 
        (nome, avatar, descricao, cor, criado, alterado, ativo) 
        VALUES 
        (?,?,?,?,SYSDATE(), SYSDATE(), 1)`, [
    pastoral.nome,
    pastoral.avatar,
    pastoral.descricao,
    pastoral.cor
  ]
  );

  let message = 'Erro na criação de pastoral';

  if (result.affectedRows) {
    message = 'Pastoral criada com sucesso';
  }

  return { message };
}

async function update(id, pastoral) {
  const result = await db.query(
    `UPDATE ${nome_tabela}
    SET nome=?,
        avatar=?,
        descricao=?,
        cor=?,
        alterado=SYSDATE(),
        ativo=?
    WHERE pastoralId=?`, [
    pastoral.nome,
    pastoral.avatar,
    pastoral.descricao,
    pastoral.cor,
    pastoral.ativo,
    id
  ]
  );

  let message = 'Erro na atualização pastoral';

  if (result.affectedRows) {
    message = 'Pastoral atualizado com sucesso ';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM ${nome_tabela} WHERE pastoralId=?`, [id]
  );

  let message = 'Erro ao deletar pastoral';

  if (result.affectedRows) {
    message = 'Pastoral deletado com sucesso';
  }

  return { message };
}

async function get(id) {
  const rows = await db.query(
    `SELECT pastoralId, nome, avatar, descricao, cor, criado, alterado, ativo
    FROM ${nome_tabela} WHERE pastoralId=?`, [id]
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