const jwt = require('jsonwebtoken')
const { v4:uuidv4 } = require('uuid')

//generating a secure key
const key = 'aplhabeta'

function setUser(user){
    return jwt.sign({
        _id: user._id,
        username:user.username,
        email:user.email,
        profilePictureURL: user.profilePictureURL,
        role: user.role ,
        cart : user.cart ,
    } , key)
}

function getUser(token){
    if(!token) return null
    return jwt.verify(token , key)
}

async function restrictToLoggedinUserOnly(req , res , next){
    userUid = req.cookies?.uid

    if(!userUid){
        req.session.error = 'Kindly log in first!'
        return res.redirect('/')
    }

    const user = getUser(userUid)
    if(!user){
        req.session.error = 'User not validated!'
        return res.redirect('/')
    }

    req.user = user 
    next()
}

function restrictTo(roles = []){
    return function (req , res , next){
        if(!req.user) return res.redirect('/')

        if(!roles.includes(req.user.role))
            return res.redirect(`/dashboard/${req.user._id}`)
        
        return next()
    }
}

module.exports = {
    setUser ,
    getUser ,
    restrictToLoggedinUserOnly ,
    restrictTo
}