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

export const GetIdConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: {$in:[req.params.userId]},
            group: false
        })
        // console.log(req.params.userId);
        // console.log(conversation);
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ error})
    }
}