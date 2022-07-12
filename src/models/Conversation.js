import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        room_name: {
            type: String,
        },
        group: {
            type: Boolean,
        },
    }, 
    { timestamps: true}
)

export default mongoose.model('Conversation', ConversationSchema )