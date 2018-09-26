const express = require('express');
const controller = require('../controllers/position')

const router = express.Router();

router.get('/:categotyId', controller.getByCategoryId);
router.post('/', controller.create);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;