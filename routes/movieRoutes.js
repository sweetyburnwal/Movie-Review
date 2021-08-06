const router = require('express').Router();
const { MovieController } = require('./../controllers');

router.get('/',  (req, res, next) => {
    const controller = new MovieController();
    controller.getAllMovies(req, res);
});

router.post('/post-rating',  (req, res, next) => {
    const controller = new MovieController();
    controller.postRating(req.query.movieId, req.query.email, req.query.starGiven, req.query.comments);
});

router.get('/movie-by-id-email',  (req, res, next) => {
    const controller = new MovieController();
    controller.getByMovieIdAndEmail(req.query.movieId, req.query.email);
});

router.get('/total-ratings-by-movie',  (req, res, next) => {
    const controller = new MovieController();
    controller.getTotalRatingsCount(req.query.movieId);
});

router.get('/average-ratings-by-movie',  (req, res, next) => {
    const controller = new MovieController();
    controller.getAverageRatingByMovie(req.query.movieId);
});

router.get('/list-by-order-size',  (req, res, next) => {
    const controller = new MovieController();
    controller.getListByOrderAndPageSize(req.query.movieId, req.query.sortingOrder, req.query.pageSize);
});

module.exports = router;
