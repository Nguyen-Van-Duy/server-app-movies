import Users from '../models/Users.js';
// import mongoose from 'mongoose';
import hash from 'object-hash'
import jwt from 'jsonwebtoken'
import Conversation from "../models/Conversation.js";

export const CreateAccount = async (req, res) => {
    const password = req.body.password
    const HasPassword = hash.MD5(password)
    const newUsers = new Users({
       user_name: req.body.user_name,
       email: req.body.email,
       password: HasPassword,
       role: 'user'
    })

    const data = await Users.find({email: req.body.email})
    if(data.length > 0) {
        res.status(401).json({
            status: 401,
            message: "Tài khoản đã tồn tại!"
        })
        return
    }
    try {
        const savedUsers = await newUsers.save()
        console.log(savedUsers,savedUsers._id.toString());

        const dataAdmin = await Users.find({role: 'admin'})
        console.log("dataAdmin: ", dataAdmin[0]._id);
        const newConversation = new Conversation({
            members: [savedUsers._id.toString(), dataAdmin[0]._id.toString()],
        })
        try {
            const savedConversation = await newConversation.save()
        } catch (error) {
            console.log(error);
        }
        res.status(200).json(savedUsers)
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
        // console.log("test data", data, data[0].id);
        if(data.length === 0) {
            res.json({
                status: 401,
                message: "Email hoặc mật khẩu không đúng!",
                data: data
            })
            return
        }
        const accessToken = jwt.sign({email: email, id: data[0].id, user_name: data[0].user_name, role: data[0].role}, 'duy', {expiresIn: '1000s'})
        res.status(200).json({
            status: 200,
            _id: data[0]._id,
            user_name: data[0].user_name,
            email: data[0].email,
            token: accessToken,
            role: data[0].role,
        })

    } catch(err) {
        res.json({
            status: 401,
            message: err
        })
    }


    // const newUsers = new Users({
    //    email: req.body.email,
    //    password: req.body.password
    // })
    
    // try {
    //     const savedUsers = await newUsers.save()
    //     res.status(200).json(savedUsers)
    // } catch (error) {
    //     res.status(500).json({ error})
    // }
}

export const GetUserController = async (req, res) => {
    try {
        const data = await Users.findById(req.params.userId)
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
        // console.log("data:", data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error})
    }
}