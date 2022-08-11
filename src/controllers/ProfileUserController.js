// import ProfileUser from '../models/ProfileUser.js';
import ProfileUsers from "../models/ProfileUsers.js"
import nodemailer from 'nodemailer'

import Users from "../models/Users.js"

export const SendProfileUserController = async (req, res, next) => {
    let dataRequest = JSON.parse(req.body.data)
    let dataResponse = {...dataRequest} 
    delete dataResponse.user_id
    delete dataResponse.user_name

    if(req && req.files && req.files?.avatar &&  req.files?.avatar[0]) {
        dataResponse.avatar =  `image/${req.files.avatar[0].filename}`
    }

    const profileUpdate = await ProfileUsers.findOneAndUpdate(
        { user_id: dataRequest.user_id },
        dataResponse,
        { new: true }
    )
    // 'profile_pic' is the name of our file input field in the HTML form

    // if (req.fileValidationError) {
    //     return res.send(req.fileValidationError);
    // }
    // else if (!req.file) {
    //     return res.send('Please select an image to upload');
    // }
    // console.log("2222");
    const userUpdate = await Users.findOneAndUpdate(
        { _id: dataRequest.user_id },
        {user_name: dataRequest.user_name},
        { new: true }
    )

        // console.log("userUpdate", userUpdate);
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

export const sendEmailController = async (req, res) => {

    const email = req.body.email
    if(!email) return res.sendStatus(401)

    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Duy 👻" <duy124678@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Xác nhận đặt hàng ✔", // Subject line
            html: `<h3>Xin chào ${email}!</h3>
            <p>Bạn nhận được email này vì bạn đã đặt hàng online trên shopee.<p>
            <p>Thông tin đơn hàng:<p>
            <div><b>Thời gian: ${new Date()}</b></div>
            <div><b>Sản phẩm: 1111111</b></div>

            <p>Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên đưới để xác nhận và hoàn tất thử tục đặt hàng</p>
            <div><a href='https://www.youtube.com/' target="_blank">Click here</a></div>
            <div>Xin chân thành cảm ơn!</div>
            `
        });
        res.json({info: info})
    } catch (error) {
        return res.status(400).json({ error: err.message });
    }
}