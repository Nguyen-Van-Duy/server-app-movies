import FavouriteMovie from '../models/FavouriteMovie.js';
import History from '../models/History.js';
import ProductMovie from '../models/ProductMovie.js';

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

export const GetMyFavouriteController = async (req, res) => {
    try {
        const dataMovie = await FavouriteMovie.find({
            user_id: req.params.userId,
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMovieHistoryController = async (req, res) => {
    try {
        const dataMovie = await History.find({
            user_id: req.params.userId,
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const AddMovieHistoryController = async (req, res) => {
    let month = new Date().getMonth() + 1
    if(month < 10) {
        month = '0' + month
    }
    const dataRequest = {
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
        category: req.body.category,
        genres: req.body.genres,
        time: new Date().getFullYear() + '-' + month
    }
    console.log("dataRequest", dataRequest);
    // const dataMovie = await History.find(dataRequest)
    // if(dataMovie.length <= 0) {
        const newMovie = new History(dataRequest)
        try {
            const savedMovie = await newMovie.save()
                console.log("newMovienewMovienewMovienewMovie", savedMovie);
            res.status(200).json(savedMovie)
        } catch (error) {
            res.status(500).json({ error})
        }
    // } else {
    //     res.status(500).json({ message: "Dã tồn tại!"})
    // }
}

export const AddFavouriteController = async (req, res) => {
    const dataRequest = {
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
        category: req.body.category
    }
    console.log("dataRequest", dataRequest);
    const dataMovie = await FavouriteMovie.find(dataRequest)
    if(dataMovie.length <= 0) {
        const newMovie = new FavouriteMovie(dataRequest)
        console.log("newMovienewMovienewMovienewMovie", newMovie);
        try {
            const savedMovie = await newMovie.save()
            res.status(200).json(savedMovie)
        } catch (error) {
            res.status(500).json({ error})
        }
    } else {
        res.status(500).json({ message: "Dã tồn tại!"})
    }
}

export const GetFavouriteController = async (req, res) => {
    const dataRequest = {
        user_id: req.params.userId,
        movie_id: req.params.movieId,
    }
    try {
        const dataMovie = await FavouriteMovie.find(dataRequest)
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const DeleteFavouriteController = async (req, res) => {
    const dataRequest = {
        _id: req.params.favouriteId,
    }
    try {
        const deleteFavouriteMovie = await FavouriteMovie.remove(dataRequest)
        res.status(200).json(deleteFavouriteMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}