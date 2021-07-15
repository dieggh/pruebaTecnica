const express = require('express');

const app = express();

const quotesRouter = require('./routes/quotes');

app.use('/api', quotesRouter);


module.exports = app;