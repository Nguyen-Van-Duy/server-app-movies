import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
    {
        email: {
            type: String
        }, 
        message: {
            type: String
        },
    },
    { timestamps: true}
)

export default mongoose.model('Feedback', FeedbackSchema )