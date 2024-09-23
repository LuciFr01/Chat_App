const express = require('express');
const { getMessages, postMessage } = require('../controllers/chatController');
const router = express.Router();

router.route('/:room').get(getMessages).post(postMessage);

module.exports = router;
