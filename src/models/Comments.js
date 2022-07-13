import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        movie_id: {
            type: String
        },
        user_id: {
            type: String
        },
        user_name: {
            type: String
        },
        avatar: {
            type: String
        },
        message: {
            type: String
        }, 
        feedback: {
            type: Array
        },
    },
    { timestamps: true}
)

export default mongoose.model('Comment', CommentSchema )