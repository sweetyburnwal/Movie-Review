const router = require('express').Router();
router.use('/', require('./movieRoutes'));
module.exports = router;
