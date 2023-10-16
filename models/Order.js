const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    itemName : {
        type : String ,
        required : true ,
    } ,
    price : {
        type : Number ,
        required : true
    } ,
    number : {
        type : Number ,
        default : 1
    }, 
    quantity : {
        type : String , 
        required : true
    }
})

const orderSchema = new mongoose.Schema({
    items : {
        type : [itemSchema]
    } ,
    numberOfItems : {
        type : Number , 
        default : 0
    } ,
    payment : {
        type : Boolean ,
        default : false
    } , 
    bill : {
        type : Number ,
        default : 0
    } ,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //ref is used to create a relationship b/w various models in our project
        ref: 'User'
    }
})

const Order = mongoose.model('Order' , orderSchema)
module.exports = {
    Order , 
    itemSchema
}
