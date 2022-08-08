import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        list_user: {
            type: Array,
        },
        room_name: {
            type: String,
        },
        group: {
            type: Boolean,
        },
        room_master: {
            type: String,
        },
    }, 
    { timestamps: true}
)

export default mongoose.model('Conversation', ConversationSchema )