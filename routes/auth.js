const router = require('express').Router();
const controller = require('../controllers/auth');

router.post('/register', controller.register);

module.exports = router;