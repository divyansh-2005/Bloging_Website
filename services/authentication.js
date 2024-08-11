const JWT = require('jsonwebtoken')

const serect = "myLoveCode"

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        name:user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
    }
    const token = JWT.sign(payload, serect)
    return token
}

function validateToken(token){
    const payload = JWT.verify(token,serect)
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}