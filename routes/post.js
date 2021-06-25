const express = require('express');
const { createPost, editPost, deletePost, getAllPost, getMyPost } = require('../controllers/post');
const { isUser } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllPost);
router.get('/my', isUser, getMyPost);
router.post('/', isUser, createPost);
router.put('/:id', editPost);
router.delete('/:id', isUser, deletePost);

module.exports = router;
