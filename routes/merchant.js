const router = require('express').Router();
const controller = require('../controllers/merchant');

router.post('/create-product', controller.createProduct);
router.post('/list-product', controller.listProduct);

module.exports = router;