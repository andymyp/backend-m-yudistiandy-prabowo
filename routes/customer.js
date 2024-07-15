const router = require('express').Router();
const controller = require('../controllers/customer');

router.post('/list-product', controller.listProduct);
router.post('/create-transaction', controller.createTransaction);

module.exports = router;