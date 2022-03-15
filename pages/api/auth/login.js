import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import {createToken, createRefreshToken} from '../../../utils/generateToken' 

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break;

        default:
            break;
    }
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(400).json({ err: 'This user does not exist' })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (!isMatch) return res.status(400).json({ err: 'Incorrect Password' })

        const access_token = createToken({id: user._id})
        const refresh_token = createRefreshToken({id: user._id})


        res.json({ 
            msg: "Login Success!",
            refresh_token,
            access_token,
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                root: user.root,
            }
        })

    } catch (error) {
        return res.status(500).json({ err: error.message })
    }
}