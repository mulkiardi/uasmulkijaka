const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const bookRouter = require('./routes/book');
const publisherRouter = require('./routes/publisher');

const sequelize = require('./configs/sequelize');

const Product = require('./models/product');
const Book = require('./models/book');
const Publiser = require('./models/publisher');

app.use(homeRouter);
app.use('/product', productRouter);
app.use('/book', bookRouter);
app.use('/publisher', publisherRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})