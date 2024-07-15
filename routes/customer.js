const router = require('express').Router();
const controller = require('../controllers/customer');

router.post('/list-product', controller.listProduct);
router.post('/update-product', controller.updateProduct);

module.exports = router;