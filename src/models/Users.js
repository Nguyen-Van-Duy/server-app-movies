import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String
        },
        user_name: {
            type: String
        },
        password: {
            type: String
        },
        role: {
            type: String
        }
    }, 
    { timestamps: true}
)

export default mongoose.model('User', UserSchema )