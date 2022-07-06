import mongoose from 'mongoose';

const ProfileUserSchema = new mongoose.Schema(
    {
        user_id: {
            type: String
        },
        user_name: {
            type: String
        },
        date_of_birth: {
            type: String
        },
        hometown: {
            type: String
        },
        loves: {
            type: String
        },
        hates: {
            type: String
        },
        description: {
            type: String
        },
        phone: {
            type: String
        },
        avatar: {
            type: String
        },
        gender: {
            type: String
        },
    }, 
    { timestamps: true}
)

export default mongoose.model('ProfileUser', ProfileUserSchema )