const express = require('express');
const router = express.Router();
const base = require('../services/base');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await base.get());
    } catch (err) {
        console.error(`Erro ao obter base`, err.message);
        next(err);
    }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await base.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Erro ao atualizar base`, err.message);
        next(err);
    }
});

module.exports = router;