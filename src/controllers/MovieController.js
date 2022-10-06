import FavouriteMovie from '../models/FavouriteMovie.js';
import History from '../models/History.js';
import ViewStatistic from '../models/ViewStatistics.js';
import ProductMovie from '../models/ProductMovie.js';
import Users from '../models/Users.js';

export const SendMovieController = async (req, res) => {
    const newMovie = new ProductMovie(req.body)
    try {
        const savedMovie = await newMovie.save()
        res.status(200).json(savedMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const SearchController = async (req, res) => {
    const userRegex = new RegExp(req.params.search, 'i')
    const resultsPerPage = 1;
    let page = req.params.page >= 1 ? req.params.page : 1;
    // const query = req.query.search;

    page = page - 1
    try {
        const dataMovie = await ProductMovie.find({
            //dk
            name: userRegex
        })
        // .select("name")
        .sort({ name: "asc" })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)

        ProductMovie.countDocuments({ name: userRegex, approval: "1"}, function (err, count) {
            if (err){
                console.log(err)
            }else{
                console.log("Count :", count)
                res.status(200).json({
                    data:dataMovie, 
                    total_results: count, 
                    per_page: resultsPerPage, 
                    total_pages: Math.ceil(count / resultsPerPage),
                    page: req.params.page

                })
            }
        });
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMovieAllController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            approval: "1"
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const FilterMovieAllController = async (req, res) => {
    let params = req.body
    params.approval = "1"
    if(params.genres) {
        params.genres = {$elemMatch: {value: params.genres}}
    //     dataMovie = await ProductMovie.find({...params, genres: {$elemMatch: {value: params.genres}}})
    // } else {
    }
    try {
        const dataMovie = await ProductMovie.find(params)
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
    // try {
    //     const dataMovie = await ProductMovie.find({
    //         approval: "1"
    //     })
    //     res.status(200).json(dataMovie)
    // } catch (error) {
    //     res.status(500).json({ error})
    // }
}

export const GetMovieDetailController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            _id: req.params.movieId,
            approval: "1"
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMovieDetailFavouriteController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            _id: req.params.movieId
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMovieUpdatingAdminController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            approval: "0"
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMovieWaitingAdminController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            approval: "3"
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const UpdateApprovalController = async (req, res) => {
    const dataUser = await Users.find({_id: req.dataAll._id})
    if(dataUser[0].role === "admin") {
        try {
            const dataMovie = await ProductMovie.findOneAndUpdate(
                { _id: req.body.movie_id },
                {approval: req.body.approval},
                { new: true }
            )
            res.status(200).json(dataMovie)
        } catch (error) {
            res.status(500).json({ error})
        }
    } else {
        res.status(401).json({message: "401"})
    }
}

export const GetMovieWaitingController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            user_id: req.params.userId,
            approval: "0"
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
            approval: "1"
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

export const DeleteMovieHistoryController = async (req, res) => {
    try {
        await History.deleteMany({
            _id: {
                $in: req.body.list_id
              }
        })
        const dataMovie = await History.find({
            user_id: req.body.userId,
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const ViewStatisticsController = async (req, res) => {
    try {
        const dataMovie = await ProductMovie.find({
            approval: "1"
        })
        res.status(200).json(dataMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const AddViewStatisticsController = async (req, res) => {
    const newMovie = new ProductMovie(req.body)
    try {
        const savedMovie = await newMovie.save()
        res.status(200).json(savedMovie)
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
    // const dataMovie = await History.find(dataRequest)
    // if(dataMovie.length <= 0) {
        const newMovie = new History(dataRequest)
        try {
            const savedMovie = await newMovie.save()
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
    const dataMovie = await FavouriteMovie.find(dataRequest)
    if(dataMovie.length <= 0) {
        const newMovie = new FavouriteMovie(dataRequest)
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
    try {
        const deleteFavouriteMovie = await FavouriteMovie.deleteOne({
            _id: req.params.favouriteId,
        })
        console.log(req.params.favouriteId, deleteFavouriteMovie);
        res.status(200).json(deleteFavouriteMovie)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const DeleteMyMovieController = async (req, res) => {
    const dataUser = await Users.find({_id: req.dataAll._id})
    if(dataUser) {
        const dataRequest = {
            _id: req.params.movieId,
        }
        try {
            const deleteMyMovie = await ProductMovie.deleteOne(dataRequest)
            res.status(200).json(deleteMyMovie)
        } catch (error) {
            res.status(500).json({ error})
        }
    } else {
        res.status(401).json({message: "401"})
    }
}