const express = require('express');

const router = express.Router();

const publisherController = require('../controllers/publisher');

router.get('/', publisherController.getIndexPublisher);

module.exports = router;