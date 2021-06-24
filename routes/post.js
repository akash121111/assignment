const express = require('express');
const { createPost, editPost, deletePost, getAllPost } = require('../controllers/post');
const router = express.Router();

router.get('/', getAllPost);
router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);

module.exports = router;
