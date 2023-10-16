const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content : {
        type : String ,
        required : true
    } ,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : 'User'
    } ,
    DisplayPicturePath : {
        type : String ,
        default :  'public/images/Default-Profile-Picture-PNG-Free-Download.png'
    } , 
    email : {
        type : String ,
        required : true
    } ,
    updated : {
        type : Boolean ,
        default : false
    }
} , {
    timestamps : true
})

const Comment = mongoose.model('Comment' , commentSchema)
module.exports = Comment