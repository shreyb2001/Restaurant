const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { itemSchema } = require ('../models/Order')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        trim: true,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid email address!')
        }
    },
    password : {
        type : String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password'))
                throw new Error('Password should not include "password"')
        }
    } , 
    profilePictureURL: {
        type: String,
        default : 'public/images/Default-Profile-Picture-PNG-Free-Download.png'
    } , 
    role : {
        type : String ,
        default : 'User'
    } , 
    cart : {
        type : [itemSchema] ,
        default : []
    }
} , {
    timestamps : true
})

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('bookings', {
    ref: 'booking',
    localField: '_id',
    foreignField: 'owner'
})

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User' , userSchema)
module.exports = User