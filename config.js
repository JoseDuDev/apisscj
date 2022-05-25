require('dotenv').config()

const config = {
  db: { /* não exponha a senha ou qualquer informação sensível, feito apenas para demonstração */
    host: process.env.DB_HOST || 'santuarioscj.com.br',
    user: process.env.DB_USER || 'scj_homolog',
    password: process.env.DB_PASSWORD || 'miguel1323maria',
    database: process.env.DB_NAME || 'scj_novo',
  },
  listPerPage: process.env.LIST_PER_PAGE || 10,
};

module.exports = config;