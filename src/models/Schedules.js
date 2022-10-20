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
        password: {
            type: String
        },
        time: {
            type: String
        },
        genres: {
            type: Array
        },
        overview: {
            type: String
        },
    }, 
    { timestamps: true}
)

export default mongoose.model('Schedule', ScheduleSchema )