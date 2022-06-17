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

export const GetMovieController = async (req, res) => {
    try {
        // console.log(req.params.conversationId);
        const dataTV = await TV.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(dataTV)
    } catch (error) {
        res.status(500).json({ error})
    }
}
