// import ProfileUser from '../models/ProfileUser.js';
import ProfileUsers from "../models/ProfileUsers.js"
import Users from "../models/Users.js"

export const SendProfileUserController = async (req, res, next) => {
    console.log('views .............', req.file.filename)
    let dataRequest = JSON.parse(req.body.data)
    let dataResponse = {...dataRequest} 
    delete dataResponse.user_id
    delete dataResponse.user_name
    // delete dataResponse.user_id

    console.log("dataResponse", dataResponse);
    if( req.file) {
        console.log("image: ");
        dataResponse.avatar =  `image/${req.file?.filename}`
    }

    const profileUpdate = await ProfileUsers.findOneAndUpdate(
        { user_id: dataRequest.user_id },
        dataResponse,
        { new: true }
    )
    console.log("data...............", dataRequest);
    console.log("profileUpdate...............", profileUpdate);
    // 'profile_pic' is the name of our file input field in the HTML form

    // if (req.fileValidationError) {
    //     return res.send(req.fileValidationError);
    // }
    // else if (!req.file) {
    //     return res.send('Please select an image to upload');
    // }
    console.log("2222");
    const userUpdate = await Users.findOneAndUpdate(
        { _id: dataRequest.user_id },
        {user_name: dataRequest.user_name},
        { new: true }
    )

        console.log("userUpdate", userUpdate);
    // Display uploaded image for user validation
    res.json({
        status: 200,
        _id: userUpdate._id.toString(),
        user_name: userUpdate.user_name,
        email: userUpdate.email,
        role: userUpdate.role,
        profile_id: profileUpdate._id.toString(),
        date_of_birth: profileUpdate.date_of_birth,
        hometown: profileUpdate.hometown,
        loves: profileUpdate.loves,
        hates: profileUpdate.hates,
        description: profileUpdate.description,
        phone: profileUpdate.phone,
        avatar: profileUpdate.avatar,
        gender: profileUpdate.gender,
        createdAt: profileUpdate.createdAt,
    })
}
        // res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);