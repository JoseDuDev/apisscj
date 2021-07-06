const express = require('express');
const router = express.Router();
const usuario = require('../services/usuario');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await usuario.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Erro ao obter usuario`, err.message);
        next(err);
    }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
    try {
        res.json(await usuario.create(req.body));
    } catch (err) {
        console.error(`Erro ao criar usuario`, err.message);
        next(err);
    }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
    try {
        res.json(await usuario.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Erro ao atualizar usuario`, err.message);
        next(err);
    }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
    try {
        res.json(await usuario.remove(req.params.id));
    } catch (err) {
        console.error(`Erro ao excluir usuario`, err.message);
        next(err);
    }
});

/* GET ID programming languages. */
router.get('/:id', async function(req, res, next) {
    try {
        res.json(await usuario.get(req.params.id));
    } catch (err) {
        console.error(`Erro ao obter usuario`, err.message);
        next(err);
    }
});

/* GET ID programming languages. */
router.get('/uid/:uid', async function(req, res, next) {
    try {
        res.json(await usuario.getUID(req.params.uid));
    } catch (err) {
        console.error(`Erro ao obter usuario`, err.message);
        next(err);
    }
});

module.exports = router;