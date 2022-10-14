import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema(
    {
        user_id: {
            type: String
        },
        name: {
            type: String
        },
        image: {
            type: String
        },
        category: {
            type: String
        },
        time: {
            type: String
        },
        date: {
            type: String
        },
        genres: {
            type: Array
        },
        overview: {
            type: Array
        },
    }, 
    { timestamps: true}
)

export default mongoose.model('Schedule', ScheduleSchema )