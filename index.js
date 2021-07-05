const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
//const exchangeRates = require('./src/exchangeRates');

const app = express();

const port = process.env.PORT || 3000;

/* Routes */
// const programmingLanguagesRouter = require('./routes/programmingLanguages');
const base = require('./routes/base');
const cargo = require('./routes/cargo');
const perfil = require('./routes/perfil');
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