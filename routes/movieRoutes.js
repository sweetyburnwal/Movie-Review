const router = require('express').Router();
const { MovieController } = require('./../controllers');

router.get('/',  (req, res, next) => {
    const controller = new MovieController();
    controller.getAllMovies(req, res);
});

router.get('/sweety',  (req, res, next) => {
    const controller = new MovieController();
    controller.getNice(req, res);
});

module.exports = router;
