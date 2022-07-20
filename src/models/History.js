import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema(
    {
        user_id: {
            type: String
        },
        movie_id: {
            type: String
        },
        category: {
            type: String
        },
        time: {
            type: String
        },
        genres: {
            type: Array
        }
    }, 
    { timestamps: true}
)

export default mongoose.model('History', HistorySchema )