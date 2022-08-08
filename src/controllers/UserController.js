import Users from '../models/Users.js';
// import mongoose from 'mongoose';
import hash from 'object-hash'
import jwt from 'jsonwebtoken'
import Conversation from "../models/Conversation.js";
import ProfileUsers from '../models/ProfileUsers.js';

export const CreateAccount = async (req, res) => {
    const password = req.body.password
    const HasPassword = hash.MD5(password)
    const newUsers = new Users({
       user_name: req.body.user_name,
       email: req.body.email,
       password: HasPassword,
       role: 'user',
    })

    const data = await Users.find({email: req.body.email})
    if(data.length > 0) {
        res.status(409).json({
            status: 409,
            message: "Account already exists!"
        })
        return
    }

    try {
        //save new account
        const savedUsers = await newUsers.save()
        console.log(savedUsers,savedUsers._id.toString());
        const newProfile = new ProfileUsers(
            {
                user_id: savedUsers._id.toString(),
                date_of_birth: "",
                hometown: "",
                loves: "",
                hates: "",
                description: "",
                phone: "",
                avatar: "image/avatar.jpeg",
                gender: "",
            }, 
        )
        const saveProfile = await newProfile.save()
        const dataProfile = {
            ...saveProfile,
            user_name: savedUsers.user_name,
            role: savedUsers.role,
        }

        //create convertation
        const dataAdmin = await Users.find({role: 'admin'})
        console.log("dataAdmin: ", dataAdmin[0]._id);
        const newConversation = new Conversation({
            members: [savedUsers._id.toString(), dataAdmin[0]._id.toString()],
            list_user: [{
                user_id: savedUsers._id.toString(),
                notification: "1"
            },
            {
                user_id: dataAdmin[0]._id.toString(),
                notification: "1"
            }],
            group: false
        })
        try {
            //save convertation
            const savedConversation = await newConversation.save()
            console.log("savedConversation", savedConversation);
        } catch (error) {
            console.log(error);
        }
        res.status(200).json(dataProfile)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const LoginController = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const HasPassword = hash.MD5(password)
    try{
        const data = await Users.find({email: req.body.email, password: HasPassword})
        console.log("test data", data, data[0].id);
        if(data.length === 0) {
            res.json({
                status: 401,
                message: "Email hoặc mật khẩu không đúng!",
                data: data
            })
            return
        }
        const dataProfile = await ProfileUsers.find({user_id: data[0]._id.toString()})
        console.log(dataProfile);
        const accessToken = jwt.sign({email: email, _id: data[0].id, user_name: data[0].user_name, role: data[0].role}, 'duy', {expiresIn: '100000s'})
        res.status(200).json({
            status: 200,
            _id: data[0]._id,
            user_name: data[0].user_name,
            email: data[0].email,
            token: accessToken,
            role: data[0].role || '',
            profile_id: dataProfile[0]._id.toString(),
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

    } catch(err) {
        res.json({
            status: 401,
            message: err
        })
    }
}

export const GetDataInfo = async (req, res) => {
    console.log("req.dataAll", req.dataAll);
    const dataProfile = await ProfileUsers.find({user_id: req.dataAll._id})
    const dataUser = await Users.find({_id: req.dataAll._id})
        console.log(dataProfile);
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

export const GetUserController = async (req, res) => {
    try {
        let data = await Users.findById(req.params.userId)
        
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetProfileController = async (req, res) => {
    try {
        let data = await ProfileUsers.find({user_id: req.params.userId})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetAdminController = async (req, res) => {
    try {
        const data = await Users.find({role: "admin"})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetFriendController = async (req, res) => {
    try {
        const data = await Users.find({_id: req.params.userId})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetUserAllController = async (req, res) => {
    try {
        const data = await Users.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const ChangePasswordController = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const newPassword = req.body.newPassword
    const newHasPassword = hash.MD5(newPassword)
    const HasPassword = hash.MD5(password)
    try{
        const data = await Users.find({email: email, password: HasPassword})
        console.log("test data", data, data[0].id);
        if(data.length === 0) {
            res.status(401).json({
                message: "Incorrect password!",
                data: data
            })
            return
        }
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