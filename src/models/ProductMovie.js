import mongoose from 'mongoose';

const ProductMovieSchema = new mongoose.Schema(
    {
        user_id: {type: String},
        user_name: {type: String},
        status: {type: String},
        overview: {type: String},
        release_date: {type: String}, 
        backdrop_path: {type: String},
        name: {type: String},
        poster_path: {type: String},
        vote_average: {type: String},
        runtime: {type: String}, 
        vote_count: {type: String}, 
        country: {type: String}, 
        director: {type: String}, 
        media_type: {type: String}, 
        url_type: {type: String},
        url: {type: String},
        year: {type: String},    
        genres: {type: Array}, 
        number_of_episodes: {type: String},
        number_of_seasons: {type: String},
        seasons: {type: Array},
        trailers: {type: Array},
    },
    { timestamps: true}
)

export default mongoose.model('ProductMovie', ProductMovieSchema )