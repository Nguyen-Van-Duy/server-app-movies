import ProductMovie from "../models/ProductMovie.js"
import Schedule from "../models/Schedules.js"
// import ProfileUsers from "../models/ProfileUsers.js"
import Users from "../models/Users.js"
// import Users from "../models/Users.js"

export const SendProductController = async (req, res, next) => {
    // console.log('views 1 .............', req?.files.image_backdrop[0].filename)
    // console.log('views 2.............', req?.files.image_poster[0].filename)
    let dataRequest = JSON.parse(req.body.data)
    // ProductMovie
    let dataResponse = {...dataRequest} 
    // console.log("dataRequest:", dataRequest);
    // delete dataResponse.user_id
    // delete dataResponse.user_name
    const dataUser = await Users.find({_id: dataResponse.user_id})
    if(dataUser.length <= 0) {
        res.status(403).json({message: "You do not have access!"})
    }

    // console.log("dataResponse", dataResponse);
    if(req && req.files && req?.files.image_backdrop[0] && req?.files.image_backdrop[0]) {
        dataResponse.backdrop_path =  `image/${req.files.image_backdrop[0].filename}`
        dataResponse.poster_path =  `image/${req.files.image_poster[0].filename}`
        dataResponse.vote_count =  "0"
        dataResponse.update = false
        dataResponse.year =  dataRequest.release_date.slice(0, 4)
        dataResponse.delete =  false
        if(dataUser[0].role === "admin") {
            dataResponse.approval =  "1"
        } else if(dataUser[0].role === "user") {
            dataResponse.approval =  "0"
        }
    }
    // console.log("data: ................", dataResponse);

    const newProductMovie = new ProductMovie(dataResponse)
    // console.log("newProductMovie:", newProductMovie);
    try {
        const savedProductMovie = await newProductMovie.save()
        res.status(200).json(savedProductMovie|| {})
    } catch (error) {
        res.status(500).json({ error})
    }


    // Display uploaded image for user validation
    // res.json({
    //     status: 200,
    //     _id: userUpdate._id.toString(),
    //     user_name: userUpdate.user_name,
    //     email: userUpdate.email,
    //     role: userUpdate.role,
    //     profile_id: profileUpdate._id.toString(),
    //     date_of_birth: profileUpdate.date_of_birth,
    //     hometown: profileUpdate.hometown,
    //     loves: profileUpdate.loves,
    //     hates: profileUpdate.hates,
    //     description: profileUpdate.description,
    //     phone: profileUpdate.phone,
    //     avatar: profileUpdate.avatar,
    //     gender: profileUpdate.gender,
    //     createdAt: profileUpdate.createdAt,
    // })
}

export const UpdateMovieController = async (req, res, next) => {
    let dataRequest = JSON.parse(req.body.data)
    // ProductMovie
    let dataResponse = {...dataRequest} 
    // console.log("dataRequest:", dataRequest);
    const dataUser = await Users.find({_id: dataResponse.user_id})
    if(dataUser.length <= 0) {
        res.status(403).json({message: "You do not have access!"})
    }

    // console.log("dataResponse", dataResponse);
    if(req && req.files && req.files.image_backdrop && req.files.image_backdrop[0]) {
        dataResponse.backdrop_path = `image/${req.files.image_backdrop[0].filename}`
    }
    if(req && req.files && req.files.image_poster && req.files.image_poster[0]) {
        dataResponse.poster_path = `image/${req.files.image_poster[0].filename}`
    }
    dataResponse.update = true
    dataResponse.year =  dataRequest.release_date.slice(0, 4)
    dataResponse.delete =  false
    if(dataUser[0].role === "admin") {
        dataResponse.approval =  "1"
    } else if(dataUser[0].role === "user") {
        dataResponse.approval =  "3"
    }

    const newProductMovie = new ProductMovie(dataResponse)
    // console.log("newProductMovie:", newProductMovie);
    // res.json(newProductMovie)
    try {
        const savedProductMovie = await newProductMovie.save()
        res.status(200).json(savedProductMovie|| {})
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetScheduleController = async (req, res) => {
    try {
        const data = await Schedule.find()
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetScheduleDetailController = async (req, res) => {
    try {
        const data = await Schedule.find({_id: req.params.movieId})
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetScheduleIdController = async (req, res) => {
    try {
        const data = await Schedule.find({user_id: req.params.userId})
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const DeleteScheduleController = async (req, res) => {
        try {
            const deleteMyMovie = await Schedule.deleteOne({_id: req.params.scheduleId})
            res.status(200).json(deleteMyMovie)
        } catch (error) {
            res.status(500).json({ error})
        }
}

export const AddScheduleController = async (req, res, next) => {
    let dataRequest = JSON.parse(req.body.data)
    // ProductMovie
    let dataResponse = {...dataRequest} 

    if(req && req.files && req.files?.avatar &&  req.files?.avatar[0]) {
        dataResponse.image =  `image/${req.files.avatar[0].filename}`
    }

    const newProductMovie = new Schedule(dataResponse)
    // console.log("newProductMovie:", newProductMovie);
    // res.json(newProductMovie)
    try {
        const savedProductMovie = await newProductMovie.save()
        res.status(200).json(savedProductMovie|| {})
    } catch (error) {
        res.status(500).json({ error})
    }
}