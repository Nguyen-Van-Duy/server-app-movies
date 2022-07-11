import mongoose from 'mongoose';

const FavouriteMovieSchema = new mongoose.Schema(
    {
        user_id: {
            type: String
        },
        movie_id: {
            type: String
        },
        category: {
            type: String
        }
    }, 
    { timestamps: true}
)

export default mongoose.model('FavouriteMovie', FavouriteMovieSchema )