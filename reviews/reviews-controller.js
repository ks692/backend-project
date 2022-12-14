import * as dao from "./reviews-dao.js"
import {findReviewsByAuthor, findReviewsByMovie} from "./reviews-dao.js";
import * as userDao from "../users/users-dao.js";

const ReviewsController = (app) => {
    const createReview = async (req, res) => {
        const review = req.body
        const currentUser = req.session['currentUser']
        review.author = currentUser._id
        const actualReview = await dao.createReview(review)
        res.json(actualReview)
    }
    const findReviewsByMovie = async (req, res) => {
        const imdbID = req.params.imdbID
        const reviews = await dao.findReviewsByMovie(imdbID)
        res.json(reviews)
    }
    const findReviewsByAuthor = async (req, res) => {
        const author = req.params.author
        const reviews = await dao.findReviewsByAuthor(author)
        res.json(reviews)
    }
    const deleteReview=async(req,res)=>{

        const reviewId=req.params.reviewId
        const imdbID = req.params.imdbID
        //console.log(reviewId)
        //console.log(imdbID)
        const status = await dao.deleteReview(reviewId);
        const reviews = await dao.findReviewsByMovie(imdbID)
        res.json(reviews)
    }
    app.post('/api/reviews', createReview)
    app.delete('/api/movies/:imdbID/:reviewId', deleteReview)
    app.get('/api/movies/:imdbID/reviews', findReviewsByMovie)
    app.get('/api/users/:author/reviews', findReviewsByAuthor)
}
export default ReviewsController