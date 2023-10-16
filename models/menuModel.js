const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    itemName : {
        type : String ,
        unqiue : true ,
        reqiured : true
    } , 
    halfPrice : {
        type : Number ,
    } , 
    fullPrice : {
        type : Number , 
        reqiured : true
    } , 
    special : {
        type : Boolean ,
        default : false
    }
} , {
    timestamps : true
})

const Menu = mongoose.model('Menu' , menuSchema)
module.exports =  {
    Menu , 
    menuSchema
}