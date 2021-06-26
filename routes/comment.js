const express = require('express');
const { createComment, createReply, deleteComment } = require('../controllers/comment');
const { isUser } = require('../middleware/auth');
const router = express.Router();

router.post('/create/:pid', isUser, createComment);
router.post('/reply/:pid/:cid', isUser, createReply);
router.delete('/:id', isUser, deleteComment);

module.exports = router;
