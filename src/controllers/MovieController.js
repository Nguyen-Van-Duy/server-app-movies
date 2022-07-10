import ProductMovie from '../models/ProductMovie.js';
import ProductTV from '../models/ProductTV.js';

export const SendMovieController = async (req, res) => {
    const newMovie = new ProductMovie(req.body)
    try {
        const savedMovie = await newMovie.save()
        res.status(200).json(savedMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMovieWaitingController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            user_id: req.params.userId,
            status: false
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMyMovieController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            user_id: req.params.userId,
            status: true
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}
