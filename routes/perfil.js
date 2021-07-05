const express = require('express');
const router = express.Router();
const perfil = require('../services/perfil');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await perfil.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Erro ao obter perfil`, err.message);
        next(err);
    }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
    try {
        res.json(await perfil.create(req.body));
    } catch (err) {
        console.error(`Erro ao criar perfil`, err.message);
        next(err);
    }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await perfil.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Erro ao atualizar perfil`, err.message);
        next(err);
    }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await perfil.remove(req.params.id));
    } catch (err) {
        console.error(`Erro ao excluir perfil`, err.message);
        next(err);
    }
});

/* GET ID programming languages. */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await perfil.get(req.params.id));
    } catch (err) {
        console.error(`Erro ao obter perfil`, err.message);
        next(err);
    }
});

module.exports = router;