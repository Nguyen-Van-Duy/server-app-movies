import ProductMovie from "../models/ProductMovie.js"
import ProfileUsers from "../models/ProfileUsers.js"
// import Users from "../models/Users.js"

export const SendProductController = async (req, res, next) => {
    console.log('views 1 .............', req?.files.image_backdrop[0].filename)
    console.log('views 2.............', req?.files.image_backdrop[0].filename)
    let dataRequest = JSON.parse(req.body.data)
    console.log("data: ................", dataRequest);
    res.json(dataRequest)
    // ProductMovie
    // let dataResponse = {...dataRequest} 
    // delete dataResponse.user_id
    // delete dataResponse.user_name

    // console.log("dataResponse", dataResponse);
    // if(req && req.files && req.files?.avatar[0]) {
    //     dataResponse.avatar =  `image/${req.files.avatar[0].filename}`
    // }

    // const profileUpdate = await ProfileUsers.findOneAndUpdate(
    //     { user_id: dataRequest.user_id },
    //     dataResponse,
    //     { new: true }
    // )
    // // console.log("data...............", dataRequest);
    // console.log("profileUpdate...............", profileUpdate);
    
    // const userUpdate = await Users.findOneAndUpdate(
    //     { _id: dataRequest.user_id },
    //     {user_name: dataRequest.user_name},
    //     { new: true }
    // )

    // // Display uploaded image for user validation
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