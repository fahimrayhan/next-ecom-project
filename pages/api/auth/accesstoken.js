import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import { createToken, createRefreshToken } from '../../../utils/generateToken'
import jwt from 'jsonwebtoken'

connectDB()

export default async (req, res) => {
   try {
       const rf_token = req.cookies.refreshtoken;
       if(!rf_token) {
           return res.status(400).json({err:"Please Login Now!"})
       }

       const result = jwt.verify(rf_token, process.env.Refresh_Token)
       if (!result) {
           return res.status(400).json({err:"Invalid Refresh Token"})
       }

       const user = await Users.findById(result.id)
       if (!user) {
           return res.status(400).json({ err: "User does not exist" })
       }

       const access_token = createToken({id: user._id})
       res.json({
           access_token,
           user: {
               name: user.name,
               email: user.email,
               role: user.role,
               avatar: user.avatar,
               root: user.root,
           }
       })
   } catch (error) {
       return res.status(500).json({err:error.message})
   }
}

