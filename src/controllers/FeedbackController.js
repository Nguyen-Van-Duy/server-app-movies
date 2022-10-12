import FeedBack from '../models/FeedBack.js';

export const SendFeedbackController = async (req, res) => {
    const newMessage = new FeedBack(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const GetFeedbackController = async (req, res) => {
    try {
        const comments = await FeedBack.find()
        
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error})
    }
}
