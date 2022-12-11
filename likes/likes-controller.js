import {getMovies} from "../movies/movies-controller.js";
import users from "../users/users.js";
import * as likesDao from "./likes-dao.js";

let likes = [
    {_id: '123', user: '111', movie: '123'},
    {_id: '234', user: '111', movie: '234'},
    {_id: '345', user: '222', movie: '345'},
    {_id: '456', user: '333', movie: '345'},
]

const LikesController = (app) => {
    const populate = (
        {
            rawResults, fieldToPopulate,
            sourceData, sourceField
        }) => {
        const populatedResults = rawResults.map((raw) => {
            const source = sourceData.find(source => source[sourceField] === raw[fieldToPopulate])
            return ({
                ...raw,
                [fieldToPopulate]: source
            })
        })
        return populatedResults
    }
    const userLikesMovie = async (req, res) => {
        const uid = req.params.uid
        const mid = req.params.mid
        const newLike = await likesDao.userLikesMovie(uid, mid)
        res.json(newLike)
    }

    const findAllLikes = async (req, res) => {
        const likes = await likesDao.findAllLikes()
        res.json(likes)
    }
    const findMoviesLikedByUser = async (req, res) => {
        const uid = req.params.uid
        //console.log("entered")
        const movies = await likesDao.findMoviesLikedByUser(uid)
        res.json(movies)
    }
    const findUsersWhoLikedMovie = async (req, res) => {
        const mid = req.params.mid
        const users = await likesDao.findUsersThatLikeMovie(mid)
        res.json(users)
    }

    app.post('/users/:uid/likes/:mid', userLikesMovie)
    app.get('/likes', findAllLikes)
    app.get('/users/:uid/likes', findMoviesLikedByUser)
    app.get('/movies/:mid/likes', findUsersWhoLikedMovie)
}

export default LikesController;