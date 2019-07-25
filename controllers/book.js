var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();

const Book = require('../models/book');
const Order = require('../models/order');

module.exports.getIndexBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (err, userData) => {
        if (err) {
            res.status(400).json({
                error: true,
                error_message: err
            })
        } else {
            Book.findAll()
                .then(bukus => res.status(200).json({
                    message: 'Data semua buku',
                    data: bukus
                }))
                .catch(e => res.json({
                    error: true,
                    error_message: e
                }));
        }
    })
}

module.exports.getDetailBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (err, userData) => {
        if (err) {
            res.status(400).json({
                error: true,
                error_message: err
            })
        } else {
            Book.findOne({
                where: {
                    id: req.params.id
                }
            }).then(buku => {
                if (buku !== null) {
                    res.status(200).json({
                        message: 'Detail buku',
                        data: buku
                    })
                } else {
                    res.status(400).json({
                        message: 'Buku tidak ada !'
                    })
                }
            }).catch(e => res.json({
                error: true,
                error_message: e
            }))
        }
    })
}

module.exports.postBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (err, userData) => {
        if (err) {
            res.status(400).json({
                error: true,
                error_message: err
            })
        } else {
            if (userData.role == 'admin' || userData.role == 'Admin') {
                Book.create({
                    name: req.body.name,
                    price: req.body.price
                }).then(buku => res.status(201).json({
                    message: 'Berhasil menyimpan',
                    data: buku
                })).catch(e => res.json({
                    error: true,
                    error_message: e
                }))
            } else {
                res.status(403).json({
                    message: 'Anda tidak mempunyai akses untuk melakukan ini'
                })
            }
        }
    })
}


module.exports.putBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (err, userData) => {
        if (err) {
            res.status(400).json({
                error: true,
                error_message: err
            })
        } else {
            if (userData.role === 'admin' || userData.role === 'Admin') {
                Book.update({
                    name: req.body.name,
                    price: req.body.price
                }, {
                    where: {
                        id: req.params.id
                    }
                }).then(buku => {
                    if (buku !== null) {
                        res.status(201).json({
                            message: 'Berhasil diperbaharui'
                        })
                    } else {
                        res.status(400).json({
                            message: 'Buku tidak ada !'
                        })
                    }
                }).catch(e => res.json({
                    error: true,
                    error_message: e
                }))
            } else {
                res.status(403).json({
                    message: 'Anda tidak mempunyai akses untuk melakukan ini'
                })
            }
        }
    })
}


module.exports.deleteBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (err, userData) => {
        if (err) {
            res.status(400).json({
                error: true,
                error_message: err
            })
        } else {
            if (userData.role === 'admin' || userData.role === 'Admin') {
                Book.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(buku => res.status(201).json({
                    message: 'Berhasil dihapus',
                })).catch(e => res.json({
                    error: true,
                    error_message: e
                }))
            } else {
                res.status(403).json({
                    message: 'Anda tidak mempunyai akses untuk melakukan ini'
                })
            }
        }
    })
}


module.exports.orderBook = (req, res) => {
    let values = [];

    jwt.verify(req.token, process.env.SECRETKEY, (error, userData) => {
        if (error) {
            res.status(400).json({
                error: true,
                error_message: error
            })
        } else {

            // TAMPUNG DATA KEDALAM ARRAY
            for (let i = 0; i < req.body.books.length; i++) {
                values[i] = {
                    tgl_order: new Date(),
                    userId: userData.id,
                    bookId: req.body.books[i]
                }
            }

            Order.bulkCreate(values)
                .then(order => res.json({
                    message: "Berhasil Order",
                    data: order
                })).catch(e => res.status(400).json({
                    message: 'Buku tidak ada',
                    error: e
                }));

        }
    })
}

