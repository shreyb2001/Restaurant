const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    date : {
        type : String ,
        required : true ,
    } ,
    time : {
        type : String ,
        required : true ,
    } ,
    phoneNumber : {
        type : String ,
        required : true ,
    } ,
    numberOfGuests : {
        type : String ,
        default : 1
    } , 
    arrangements : {
        type : String ,
        default : '-'
    } ,
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //ref is used to create a relationship b/w various models in our project
        ref: 'User'
    }
} , {
    timestamps : true
})

const booking = mongoose.model('booking' , bookingSchema)
module.exports = booking