const express = require('express')
const router = new express.Router()
const { setUser , getUser , restrictToLoggedinUserOnly } = require('../middlewares/auth')
const { Menu } = require('../models/menuModel')
const User = require('../models/userModel')
const { Order } = require('../models/Order')
const booking = require('../models/bookTable')
const Comment = require('../models/comments')
const { number } = require('yargs')

router.get('/manage/:id' , restrictToLoggedinUserOnly ,async(req , res) => {
    const bookings = await booking.find({ owner : req.user._id })
    const Orders = await Order.find({ owner : req.user._id })
    res.render('manage' , {
        user: req.user , 
        path : req.user?.profilePictureURL.split(`public`)[1] ,
        bookings ,
        Orders , 
        
    })
})

router.get('/add?' , restrictToLoggedinUserOnly , async(req , res) => {
    try{
        //gathering the essential details
        const item = await Menu.findById(req.query._id)
        const user = await User.findById(req.user._id)
        let cartItem = []
        let quantity = undefined

        const isMatch = user.cart.find((inCart) => inCart.itemName == item.itemName && inCart.price == req.query.price)
        if(isMatch){
            let number = isMatch.number + 1
            await User.findOneAndUpdate(
                { _id: user._id , 'cart._id' : isMatch._id } ,
                { $set: { 'cart.$.number': number} },
                { new: true }
            )
            return res.redirect(`/dashboard/${user._id}?viewMenu`)
        }

        if(item.halfPrice == req.query.price)
            quantity = 'Half Plate'
        else if(item.fullPrice == req.query.price)
            quantity = 'Full Plate'

        cartItem = {
            itemName : item.itemName ,
            price : req.query.price ,
            quantity
        }

        user.cart.push(cartItem)
            await user.save()
                return res.redirect(`/dashboard/${user._id}?viewMenu`)
    }catch(e){
        res.send(`not working , ${e}`)
    }
})

router.get('/delete?' , restrictToLoggedinUserOnly , async(req , res) => {
    await User.findByIdAndUpdate({ _id : req.user._id} ,
        { $pull : { cart : { _id : req.query._id , price : req.query.price}}} , 
        { new : true })
        .then(() => {
            console.log('Item deleted from cart!')
            res.redirect(`/dashboard/${req.user._id}?viewCart`)
        })
})

router.get('/increase?' , restrictToLoggedinUserOnly , async(req , res) => {
    let count = parseInt(req.query.number)
    let updated = count+1
    await User.findOneAndUpdate({ _id : req.user._id , 'cart._id': req.query._id,} ,
        { $set : { 'cart.$.number' : updated}} , 
        { new : true })
        .then(() => {
            console.log('Item count increased from cart!')
            res.redirect(`/dashboard/${req.user._id}?viewCart`)
        })
})

router.get('/addSpecial?' , restrictToLoggedinUserOnly , async(req , res) => {
    try{
        //gathering the essential details
        const item = await Menu.findById(req.query._id)
        const user = await User.findById(req.user._id)
        let cartItem = []
        let quantity = undefined

        const isMatch = user.cart.find((inCart) => inCart.itemName == item.itemName && inCart.price == req.query.price)
        if(isMatch){
            let number = isMatch.number + 1
            await User.findOneAndUpdate(
                { _id: user._id , 'cart._id' : isMatch._id } ,
                { $set: { 'cart.$.number': number} },
                { new: true }
            )
            return res.redirect(`/dashboard/${user._id}?specialMenu`)
        }

        if(item.halfPrice == req.query.price)
            quantity = 'Half Plate'
        else if(item.fullPrice == req.query.price)
            quantity = 'Full Plate'

        cartItem = {
            itemName : item.itemName ,
            price : req.query.price ,
            quantity
        }

        user.cart.push(cartItem)
            await user.save()
                return res.redirect(`/dashboard/${user._id}?specialMenu`)
    }catch(e){
        res.send(`not working , ${e}`)
    }
})

router.get('/order' , restrictToLoggedinUserOnly , async(req , res) => {
    const user = await User.findById(req.user._id)
    const numberOfItems = user.cart.reduce((total , item ) => total + item.number , 0)
    const bill = user.cart.reduce((total , item ) => total + item.price , 0)
    try{
        const newOrder = await new Order({
            items : user.cart ,
            numberOfItems ,
            bill ,
            payment : true ,
            owner : user._id
        })

        await newOrder.save()

        //clearing the cart
        user.cart = [];
        await user.save()
            .then(() => {
                console.log('Order placed!')
                    res.redirect(`/dashboard/${user._id}`)
            })
    }catch(e){
        res.send(`Error , ${e}`)
    }
})

router.post('/book/:id', restrictToLoggedinUserOnly , async( req , res) => {
    const { date , time , phoneNumber , numberOfGuests , arrangements} = req.body

    try{
        const newBooking = await new booking({
            date , 
            time ,
            phoneNumber ,
            numberOfGuests ,
            arrangements , 
            owner : req.user._id
        })

        await newBooking.save()
            .then(() => {
                console.log('Booking confirmed')
                    res.redirect(`/dashboard/${req.user._id}`)
            })
    }catch(e){
        res.send(`Error , ${e}`)
    }
})

router.post('/comments/:id' , restrictToLoggedinUserOnly , async(req , res) => {
    const { review }= req.body

    try{
        const newReview = await new Comment({
            content : review ,
            owner : req.user._id ,
            DisplayPicturePath : req.user?.profilePictureURL.split(`public`)[1] ,
            email : req.user.email
        })

        await newReview.save()
            .then(() => {
                console.log('Comment saved!')
                res.redirect(`/dashboard/${req.user._id}`)
            })
    }catch(e){
        res.send(`Error , ${e}`)
    }
})

module.exports = router