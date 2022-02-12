import mongoose from 'mongoose';
import avatar from '../public/avatar/avatar.jpg'
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user'
    },
    root:{
        type:Boolean,
        default: false
    },
    avatar:{
        type: String,
        default: avatar
    },
    
},
{
    timestamps: true
})

let Dataset = mongoose.models.user || mongoose.model('user',userSchema)

export default Dataset