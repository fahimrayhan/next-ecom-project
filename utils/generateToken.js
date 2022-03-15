import jwt from "jsonwebtoken";

export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'15min'})
}

export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.Refresh_Token, {expiresIn:'7d'})
}