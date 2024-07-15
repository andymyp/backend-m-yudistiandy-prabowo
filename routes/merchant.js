const router = require('express').Router();
const controller = require('../controllers/merchant');

router.post('/create-product', controller.createProduct);
router.post('/list-product', controller.listProduct);
router.post('/update-product', controller.updateProduct);

module.exports = router;