import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: String,
    firstName: String,
    lastName: String,
    dateOfBirth:Date,
    role: {type: String, enum: ['ADMIN', 'MODERATOR', 'USER']}
}, {collection: 'users'})

export default usersSchema