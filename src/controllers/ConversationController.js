import Conversation from "../models/Conversation.js";

export const ConversationController = async (req, res) => {
    console.log("ConversationController: ",req.body.sender_id, req.body.receiver_id);
    const newConversation = new Conversation({
        members: [req.body.sender_id, req.body.receiver_id],
        group: false
    })
    
    try {
        const savedConversation = await newConversation.save()
        console.log("savedConversation", savedConversation);
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GroupConversationController = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.sender_id, req.body.receiver_id],
        group: true,
        room_name: req.body.room_name,
        room_master: req.body.room_master
    })
    
    try {
        const savedConversation = await newConversation.save()
        console.log("savedConversation", savedConversation);
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const DeleteConversation = async (req, res) => {
    try {
        const deleteComment = await Conversation.remove({
            _id: req.params.conversationId
        })
        res.status(200).json(deleteComment)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetIdConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in:[req.params.userId]},
            group: false
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetGroupConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in:[req.params.userId]},
            group: true
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ error})
    }
}