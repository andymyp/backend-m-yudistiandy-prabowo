const router = require('express').Router();
const controller = require('../controllers/merchant');

router.post('/create-product', controller.createProduct);

module.exports = router;