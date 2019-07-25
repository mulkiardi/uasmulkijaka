const express = require('express');
const bodyParser = require('body-parser'); //materi

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json()); //materi

const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const bukuRouter = require('./routes/book');

const sequelize = require('./configs/sequelize');

const Product = require('./models/product');
const User = require('./models/user');
const Book = require('./models/book');

app.use(homeRouter);
app.use('/product', productRouter);
app.use('/users', userRouter);
app.use('/books', bukuRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})