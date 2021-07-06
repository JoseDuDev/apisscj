const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
//const exchangeRates = require('./src/exchangeRates');

const app = express();

app.use(cors())

app.use(express.json());

app.use((req, res, next) => {
    const allowedOrigins = [
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://127.0.0.1:3001',
        'http://localhost:3001'
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    return next();
});

const port = process.env.PORT || 3000;

/* Routes */
// const programmingLanguagesRouter = require('./routes/programmingLanguages');
const base = require('./routes/base.route');
const usuario = require('./routes/usuario.route');
const cargo = require('./routes/cargo.route');
const perfil = require('./routes/perfil.route');
/* Routes */

app.use(helmet());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})

// app.use('/api/programming-languages', programmingLanguagesRouter);
app.use('/api/base', base);
app.use('/api/usuario', usuario);
app.use('/api/cargo', cargo);
app.use('/api/perfil', perfil);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});