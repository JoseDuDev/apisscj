const express = require('express');
const router = express.Router();
const cargo = require('../services/cargo');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await cargo.get());
    } catch (err) {
        console.error(`Erro ao obter base`, err.message);
        next(err);
    }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await cargo.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Erro ao atualizar base`, err.message);
        next(err);
    }
});

module.exports = router;