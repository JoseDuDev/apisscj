const env = process.env;

const config = {
  db: { /* não exponha a senha ou qualquer informação sensível, feito apenas para demonstração */
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_santuarioscj',
    password: env.DB_PASSWORD || '100santuarioSCJ',
    database: env.DB_NAME || 'freedbtech_sscjbd',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;