import mongoose from "mongoose";

const moviesSchema = mongoose.Schema({
    _id:{ type:Number},
    title: {type: String},
    image:{type:String},
    averageScore: Number
}, {collection: 'movies'})

export default moviesSchema