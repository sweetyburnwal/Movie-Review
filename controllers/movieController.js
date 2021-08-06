const view = require('./../views');
const {Client} = require("pg");

const movieClient = new Client({
    user: 'yourUserName',
    host: 'localhost',
    database: 'movie',
    password: 'yourPassword',
    port: 5432,
})
movieClient.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const reviewClient = new Client({
    user: 'yourUserName',
    host: 'localhost',
    database: 'review',
    password: 'yourPassword',
    port: 5432,
})
reviewClient.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

class MovieController {
    /**
     * return list of all movies from the table
     */
    getAllMovies() {
        movieClient.query("SELECT * FROM movie").then((result) => {
            return ({
                data: this.getData(result.rows)
            })
        })
    }

    getData(value) {
        return {
            ...value,
        }
    }

    /**
     *
     * @param movieId id of the movie from movie table which is going to be reviewed
     * @param email user email, who is going to review
     * @param starGiven total stars given by user 1 is min and 5 is max
     * @param comments comments(comment) submitted by user
     */
    postRating(movieId, email, starGiven, comments) {
        // We will check if the user has reviewed it earlier or not
        if (this.getByMovieIdAndEmail(movieId, email)) {
            reviewClient.query(`INSERT INTO review (movieId, email, star, comment)
                                VALUES (${movieId}, ${email}, ${starGiven}, ${comments})`).then((result) => {
                return result;
            })
        }
    }

    /**
     *
     * @param movieId id of the movie from movie table which is going to be reviewed
     * @param email email of the user
     */
    getByMovieIdAndEmail(movieId, email) {
        reviewClient.query(`SELECT *
                            FROM review
                            where movieId = ${movieId}
                              and email = ${email}`).then((result) => {
            if (result && result.length > 0) {
                // user already reviewed
                return false;
            } else {
                return true;
            }
        })
    }

    /**
     *
     * @param movieId id of the movie from movie table which has been reviewed
     * return total count of users who has reviewed this movie
     */
    getTotalRatingsCount(movieId) {
        reviewClient.query(`Select count(*)
                            from review
                            where movieId = ${movieId}`).then((result) => {
            return result;
        })
    }

    /**
     *
     * @param movieId id of the movie from movie table which has been reviewed
     * return Average count of rating stars of the given movie
     */
    getAverageRatingByMovie(movieId) {
        reviewClient.query(`Select AVG(star)
                            from review
                            where movieId = ${movieId}`).then((result) => {
            return result;
        })
    }

    /**
     *
     * @param movieId id of the movie from movie table which has been reviewed
     * @param sortingOrder can be ascending or descending
     * @param pageSize pageSize of the list which user want to sell, like 10 or 20 in one page
     * return List of comment and star of the selected movies by sorting order(ascending or descending) and pageSize
     */
    getListByOrderAndPageSize(movieId, sortingOrder, pageSize) {
        reviewClient.query(`SELECT comment, star
                            FROM review
                            ORDER BY star ${sortingOrder} and  limit = ${pageSize}
                            where movieId= ${movieId}`).then((result) => {
            return result;
        })
    }
}

module.exports = MovieController;
