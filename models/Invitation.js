import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema(
    {
        senderId: {
            type: String
        },
        receiverId: {
            type: String
        },
        senderAvatar: {
            type: String
        }, 
        senderName: {
            type: String
        },
        friend: {
            type: Boolean
        }, 
    },
    { timestamps: true}
)

export default mongoose.model('Invitation', InvitationSchema )