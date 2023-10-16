const express = require('express')
const User = require('../models/userModel')
const { Order } = require('../models/Order')
const { Menu } = require('../models/menuModel')
const Comment = require('../models/comments')
const router = new express.Router()

router.get('/:id/dashboard' , async(req , res) => {
    try{
        const admin = await User.findById(req.user._id)
        res.render('adminDashboard' , {
            admin 
        })
    }catch(e){
        res.send(`Error! , ${e}`)
    }
})

router.get('/:id/userInfo' , async(req , res) => {
    try{
        const admin = await User.findById(req.user._id)
        const users = await User.find({})
                            .populate('orders')
                            .populate('comments')
                            .populate('bookings')

        res.render('adminDashboard' , {
            users ,
            admin
        })
    }catch{
        res.send(`Error! , ${e}`)
    }
})

router.get('/:id/updateSpecial' , async(req , res) => {
    try{
        const admin = await User.findById(req.user._id)
        const menus = await Menu.find({})
        const special = menus.filter((item) => item.special)
        res.render('adminDashboard' , {
            menus , 
            admin ,
            special
        })
    } catch(e){
        res.send(`Error! , ${e}`)
    }
})

router.post('/:id/removeSpecial?' , async(req , res) => {
    try{
        await Menu.findByIdAndUpdate({ _id : req.params.id } , 
            {$set : { special : false}} , 
            { new : true})
        
        res.redirect(`/dashboard/admin/${req.user._id}/updateSpecial?`)
    } catch (e){
        res.send(`Error , ${e}`)
    }
})

router.post('/:id/addSpecial?' , async(req , res) => {
    try{
        await Menu.findByIdAndUpdate({ _id : req.params.id } , 
            {$set : { special : true}} , 
            { new : true})
        
        res.redirect(`/dashboard/admin/${req.user._id}/updateSpecial?`)
    } catch (e){
        res.send(`Error , ${e}`)
    }
})

router.post('/:id/addToMenu?' , async(req , res) => {
    try{
        const newMenu = await new Menu({
            itemName : req.body.itemName ,
            halfPrice : req.body.halfPrice ,
            fullPrice : req.body.fullPrice
        })

        await newMenu.save()
            .then(() => {
                console.log('Item Added!')
                res.redirect(`/dashboard/admin/${req.user._id}/updateItem?`)
            })
    }catch(e){
        res.send(`Error! , ${e}`)
    }
})

router.get('/:id/updateItem' , async(req , res) => {
    try{
        const admin = await User.findById(req.user._id)
        const update = await Menu.findById(req.params.id)
        const menus = await Menu.find({})

        res.render('adminDashboard' , {
            update ,
            menus ,
            admin
        })
    } catch(e){
        res.send(`Error! , ${e}`)
    }
})

router.post('/:id/updateItem' , async( req , res) => {
    try{
        await Menu.findByIdAndUpdate({ _id : req.params.id } , 
            {$set : { itemName : req.body?.itemName , halfPrice : req.body.halfPrice , fullPrice : req.body?.fullPrice}} , 
            { new : true})

        console.log('Updated!')
        res.redirect(`/dashboard/admin/${req.user._id}/updateItem?`)
    }catch(e){
        res.send(`Error! , ${e}`)
    }
})

router.post('/:id/deleteItem' , async(req , res) => {
    try{
        await Menu.findByIdAndDelete(req.params.id)
                .then(() => {
                    console.log('Item Deleted!')
                    res.redirect(`/dashboard/admin/${req.user._id}/updateItem?`)
                })
    }catch(e){
        res.send(`Error! , ${e}`)
    }
})

router.get('/:id/editComments?' , async(req , res) => {
    const admin = await User.findById(req.user._id)
    const users = await User.find({}).populate('comments')
    res.render('adminDashboard' , {
        users ,
        admin
    })
})

router.post('/:id/editComments?' , async(req , res) => {
    try{
        await Comment.findByIdAndUpdate({ _id : req.params.id } , 
            {$set : { content : req.body?.content , updated : true}} , 
            { new : true})
            .then(() => {
                console.log('Comment updated')
                res.redirect(`/dashboard/admin/${req.user._id}/editComments`)
            })
    }catch(e){
        res.send(`Error! , ${e}`)
    }
})

router.post('/:id/deleteComments?' , async(req , res) => {
    try{
        await Comment.findByIdAndDelete(req.params.id)
                .then(() => {
                    console.log('Item Deleted!')
                    res.redirect(`/dashboard/admin/${req.user._id}/editComments`)
                })
    }catch(e){
        res.send(`Error! , ${e}`)
    }
})

module.exports = router