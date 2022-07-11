import ProductMovie from "../models/ProductMovie.js"
import ProfileUsers from "../models/ProfileUsers.js"
import Users from "../models/Users.js"
// import Users from "../models/Users.js"

export const SendProductController = async (req, res, next) => {
    console.log('views 1 .............', req?.files.image_backdrop[0].filename)
    console.log('views 2.............', req?.files.image_poster[0].filename)
    let dataRequest = JSON.parse(req.body.data)
    // ProductMovie
    let dataResponse = {...dataRequest} 
    // delete dataResponse.user_id
    // delete dataResponse.user_name
    const dataUser = await Users.find({_id: dataResponse.user_id})
    if(dataUser.length <= 0) {
        res.status(403).json({message: "You do not have access!"})
    }

    console.log("dataResponse", dataResponse);
    if(req && req.files && req?.files.image_backdrop[0] && req?.files.image_backdrop[0]) {
        dataResponse.backdrop_path =  `image/${req.files.image_backdrop[0].filename}`
        dataResponse.poster_path =  `image/${req.files.image_poster[0].filename}`
        dataResponse.vote_count =  "0"
        dataResponse.year =  dataRequest.release_date.silce(0, 4)
        if(dataUser[0].role === "admin") {
            dataResponse.status =  true
        } else if(dataUser[0].role === "user") {
            dataResponse.status =  true
        }
    }
    // console.log("data: ................", dataResponse);

    const newProductMovie = new ProductMovie(dataResponse)
    try {
        const savedProductMovie = await newProductMovie.save()
        res.status(200).json(savedProductMovie)
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