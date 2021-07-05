const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const nome_tabela = "base";

async function update(base) {
    const result = await db.query(
        `UPDATE ${nome_tabela}
        SET alterado=SYSDATE(),
            url=?,
            titulo=?,
            descricao=?,
            telefone1=?,
            email=?,
            endereco=?,
            bairro=?,
            cep=?,
            cidade=?,
            uf=?,
            usuarioId=?,
            subdominio=?,
            telefone2=?,
            whatsapp=?,
            facebook=?,
            instagram=?,
            youtube=?,
            twitter=?
    WHERE 1`, [
            base.nome,
            base.titulo,
            base.descricao,
            base.telefone1,
            base.email,
            base.endereco,
            base.bairro,
            base.cep,
            base.cidade,
            base.uf,
            base.usuarioId,
            base.subdominio,
            base.telefone2,
            base.whatsapp,
            base.facebook,
            base.instagram,
            base.youtube,
            base.twitter
        ]
    );
    let message = 'Erro na atualização base';

    if (result.affectedRows) {
        message = 'Base atualizado com sucesso ';
    }

    return { message };
}

async function get() {
    const rows = await db.query(
        `SELECT 
              url, 
              titulo, 
              descricao, 
              telefone1, 
              email, 
              endereco, 
              bairro, 
              cep, 
              cidade, 
              uf, 
              alterado, 
              usuarioId, 
              subdominio, 
              telefone2,
              whatsapp, 
              facebook, 
              instagram, 
              youtube, 
              twitter
          FROM ${nome_tabela} WHERE 1`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

module.exports = {
    get,
    update
}