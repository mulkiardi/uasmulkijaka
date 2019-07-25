const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book');
const auth = require('../configs/auth');

router.get('/',  auth.verivyToken, bookController.getIndexBook);
router.get('/:id',  auth.verivyToken, bookController.getDetailBook);
router.post('/',  auth.verivyToken, bookController.postBook);
router.put('/:id',  auth.verivyToken, bookController.putBook);
router.delete('/:id',  auth.verivyToken, bookController.deleteBook);
router.post('/order',  auth.verivyToken, bookController.orderBook);


module.exports = router;