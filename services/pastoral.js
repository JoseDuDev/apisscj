const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const nome_tabela = "pastorais";
/*  `id` int(11) NOT NULL,
  `icone` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `introducao` text NOT NULL,
  `status` enum('S','N') NOT NULL DEFAULT 'S',
  `id_o` int(11) NOT NULL,
  `urlcheck` varchar(255) NOT NULL
 */
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, titulo, icone, introducao, id_o, urlcheck, status
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
        (titulo, icone, introducao, id_o, urlcheck, status) 
        VALUES 
        (?,?,?,?,SYSDATE(), SYSDATE(), 1)`, [
    pastoral.titulo,
    pastoral.icone,
    pastoral.introducao,
    pastoral.id_o,
    pastoral.urlcheck,
    pastoral.status
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
    SET titulo=?,
        icone=?,
        introducao=?,
        id_o=?,
        urlcheck=?,
        status=?
    WHERE id=?`, [
    pastoral.titulo,
    pastoral.icone,
    pastoral.introducao,
    pastoral.id_o,
    pastoral.urlcheck,
    pastoral.status,
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
    `DELETE FROM ${nome_tabela} WHERE id=?`, [id]
  );

  let message = 'Erro ao deletar pastoral';

  if (result.affectedRows) {
    message = 'Pastoral deletado com sucesso';
  }

  return { message };
}

async function get(id) {
  const rows = await db.query(
    `SELECT id, titulo, icone, introducao, id_o, urlcheck, status
    FROM ${nome_tabela} WHERE id=?`, [id]
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