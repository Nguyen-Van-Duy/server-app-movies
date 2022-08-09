import Comments from "../models/Comments.js"

export const GetCommentController = async (req, res) => {
    try {
        const comments = await Comments.find({
            movie_id: req.params.movieId
        })
        
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const DeleteCommentController = async (req, res) => {
    try {
        const deleteComment = await Comments.remove({
            _id: req.params.commentId
        })
        res.status(200).json(deleteComment)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const EditCommentController = async (req, res) => {
    try{
        const messageUpdate = await Comments.findOneAndUpdate(
            { _id: req.body.messageId },
            {message: req.body.message},
            { new: true }
        )
        res.status(200).json(messageUpdate)
    } catch (error) {
        res.status(500).json({ error})
    }
}

export const SendCommentController = async (req, res) => {
    const newComment = new Comments({
       movie_id: req.body.movie_id,
       user_id: req.body.user_id,
       user_name: req.body.user_name,
        avatar: req.body.avatar,
        message: req.body.message, 
        feedback: []
    })
    
    try {
        const saveComment = await newComment.save()
        res.status(200).json(saveComment)
    } catch (error) {
        res.status(500).json({ error})
    }
}