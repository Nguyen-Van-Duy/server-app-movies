// import ProfileUser from '../models/ProfileUser.js';
import ProfileUsers from "../models/ProfileUsers.js"
import nodemailer from 'nodemailer'
import hash from 'object-hash'
import jwt from 'jsonwebtoken'

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

export const forgotPasswordController = async (req, res) => {

    const email = req.body.email
    if(!email) return res.sendStatus(401)
    const accessToken = jwt.sign({email: email}, 'duy', {expiresIn: '60s'})
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
            subject: "Lấy lại mật khẩu ✔", // Subject line
            html: `<h3>Xin chào ${email}!</h3>
            <div><b>Thời gian: ${new Date()}</b></div>
            <p>You Click on this link to create a new password <a href="http://localhost:3000/reset-password/${accessToken}">link</a></p>
            `
        });
        res.json({info: info})
    } catch (error) {
        return res.status(400).json({ error: err.message });
    }
}

export const getForgotPasswordController = async (req, res) => {
    const dataProfile = await ProfileUsers.find({user_id: req.dataAll._id})
    const dataUser = await Users.find({_id: req.dataAll._id})
    res.json({
        status: 200,
        _id: req.dataAll._id,
        user_name: dataUser[0].user_name,
        email: req.dataAll.email,
        token: req.dataAll.accessToken,
        role: req.dataAll.role,
        profile_id: dataProfile[0]._id.toString() || '',
        date_of_birth: dataProfile[0].date_of_birth || '',
        hometown: dataProfile[0].hometown || '',
        loves: dataProfile[0].loves || '',
        hates: dataProfile[0].hates || '',
        description: dataProfile[0].description || '',
        phone: dataProfile[0].phone || '',
        avatar: dataProfile[0].avatar || '',
        gender: dataProfile[0].gender || '',
        createdAt: dataProfile[0].createdAt || '',
    })
}

export const ResetPasswordController = async (req, res) => {
    const newPassword = req.body.password
    const newHasPassword = hash.MD5(newPassword)
    try{
        const data = await Users.find({email: req.dataAll.email})
        console.log("newPassword", newPassword);
        console.log("data", data);
        if(data.length === 0) {
            res.status(401).json({
                message: "Incorrect password!",
                data: data
            })
            return
        }
        console.log("data[0]", data[0]);
        const passwordUpdate = await Users.findOneAndUpdate(
            { _id: data[0].id },
            {password: newHasPassword},
            { new: true }
        )
        res.json(passwordUpdate)
    } catch(err) {
        res.status(401).json({
            message: 'Incorrect password!'
        })
    }
}
