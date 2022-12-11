import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
    like: Boolean,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    movie: {type: mongoose.Schema.Types.Number, ref: 'MovieModel'},
}, {collection: 'likes'})
export default likesSchema