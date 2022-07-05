import Invitation from '../models/Invitation.js';
import Message from '../models/Message.js';

export const SendMessageController = async (req, res) => {
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetMessageController = async (req, res) => {
    try {
        // console.log(req.params.conversationId);
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetInvitationController = async (req, res) => {
    try {
        const sendInvitations = await Invitation.find({
            sender_id: req.params.invitationId
        })
        const getInvitations = await Invitation.find({
            receiver_id: req.params.invitationId
        })
        const invitations = [...getInvitations, ...sendInvitations]
        // console.log("invitations: ", invitations);
        res.status(200).json(invitations)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const SendInvitationController = async (req, res) => {
    const newInvitation = new Invitation({
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        sender_avatar: req.body.sender_avatar, 
        sender_name: req.body.sender_name,
        friend: false, 
    })
    try {
        const savedInvitation = await newInvitation.save()
        res.status(200).json(savedInvitation)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const DeleteInvitationController = async (req, res) => {
    try {
        const deleteInvitations = await Invitation.remove({
            _id: req.params.invitationId
        })
        res.status(200).json(deleteInvitations)
    } catch (error) {
        res.status(500).json({ error})
    }
}