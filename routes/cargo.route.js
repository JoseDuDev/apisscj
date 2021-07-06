const express = require('express');
const router = express.Router();
const cargo = require('../services/cargo');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await cargo.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Erro ao obter cargo`, err.message);
        next(err);
    }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
    try {
        res.json(await cargo.create(req.body));
    } catch (err) {
        console.error(`Erro ao criar cargo`, err.message);
        next(err);
    }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await cargo.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Erro ao atualizar cargo`, err.message);
        next(err);
    }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await cargo.remove(req.params.id));
    } catch (err) {
        console.error(`Erro ao excluir cargo`, err.message);
        next(err);
    }
});

/* GET ID programming languages. */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await cargo.get(req.params.id));
    } catch (err) {
        console.error(`Erro ao obter cargo`, err.message);
        next(err);
    }
});

module.exports = router;