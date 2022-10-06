import mongoose from 'mongoose';

const ViewStatisticSchema = new mongoose.Schema(
    {
        movie_id: {
            type: String
        },
        name: {
            type: String
        },
        backdrop_path: {
            type: String
        },
        poster_path: {
            type: String
        },
        overview: {
            type: String
        },
        category: {
            type: String
        },
        total: {
            type: Number
        },
    }, 
    { timestamps: true}
)

export default mongoose.model('ViewStatistic', ViewStatisticSchema )