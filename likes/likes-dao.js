import likesModel from "./likes-model.js";

export const userLikesMovie = async (uid, mid) => {
    return await likesModel.create({user: uid, movie: mid,liked:true})
}

export const findMoviesLikedByUser = async(uid) => {
    return await likesModel
        .find({user: uid}, {user: true})
        .populate('movie', 'title')
        .populate('movie', '_id')
        .exec()
}
export const findUsersThatLikeMovie = async(mid) => {
    return await likesModel.find({movie: mid}, {movie: false})
        .populate('user', 'username')
        .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()
