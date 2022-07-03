import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema(
    {
        sender_id: {
            type: String
        },
        receiver_id: {
            type: String
        },
        sender_avatar: {
            type: String
        }, 
        sender_name: {
            type: String
        },
        friend: {
            type: Boolean
        }, 
    },
    { timestamps: true}
)

export default mongoose.model('Invitation', InvitationSchema )