const express = require('express')
const router = new express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const { setUser , getUser , restrictToLoggedinUserOnly } = require('../middlewares/auth')
const upload = require('../helpers/helper-func')
const { Menu } = require('../models/menuModel')
const Comment = require('../models/comments')

router.get('/' , async(req , res) => {
    let menuItems = await Menu.find({})
    res.render('index' , {
        menuItems
    })

    req.session.message = ''
    req.session.error = ''
})

router.get('/dashboard/:id' , restrictToLoggedinUserOnly , async(req , res) => {
    let user = await User.findById(req.user._id)
    let menuItems = await Menu.find({})
    let specialMenu = menuItems.filter(item => item.special)
    let comments = await Comment.find({})
    let cart = user.cart
    const numberOfItems = user.cart.reduce((total , item ) => total + item.number , 0)
    const bill = user.cart.reduce((total , item ) => total + item.price , 0)
    res.render('index' , {
        user ,
        menuItems ,
        specialMenu , 
        path : user?.profilePictureURL.split(`public`)[1] ,
        numberOfItems ,
        cart ,
        bill , 
        comments
    })

    req.session.message = ''
    req.session.error = ''
});

router.get('/login' , async(req , res) => {
    res.render('login' , {
        error : req.session.error ,
        message : req.session.success
    })
    req.session.message = ''
    req.session.error = ''
})

router.post('/login' , async(req , res) => {
    const { email , password } = req.body
    try{
        //finding user using it's email
        let user = await User.findOne({ email })
        if(!user){
            req.session.error = 'This email is not registered! Kindly signup first!'
                console.log('Failed! Email not registered!')
                    return res.redirect('/login')
        }

        //comparing the hashed password
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            req.session.error = 'Incorrect password!'
                console.log('Failed! Incorrect password!')
                return res.redirect('/login')
        }

        //generating the token for authentication
        const token = setUser(user)

        //sending the token in the HTTP header
        res.cookie('uid' , token)
            console.log('Credentials verified')
                res.redirect(`/dashboard/${user._id}`)
    } catch(e){
        req.session.error = `Error! Please try again! , ${e}`
            console.log('Error!' , e)
                res.redirect('/login')
    }
})

router.get('/signup?' , async(req ,res) => {
    res.render('signup' , {
        error : req.session.error,
        message : req.session.message
    })
    req.session.message = ''
    req.session.error = ''
})

router.post('/signup?', upload.single('profilePicture')  ,async(req ,res) => {
    const {firstName , surname , email , password} = req.body
    try{
        //setting up new user
        let user = new User({
            username : `${firstName} ${surname}`,
            email ,
            password ,
            profilePictureURL : req.file?.path
        })

        await user.save()
            .then(() => {
                req.session.message = `Congrats! You've successfully signed up!`
                console.log('Successfully registered!')

                //generating the token for authentication
                const token = setUser(user)

                //sending the token in the HTTP header
                res.cookie('uid' , token)
                    console.log('Credentials verified')
                        return res.redirect(`/dashboard/${user._id}`)
            })
            .catch((e) => {
                req.session.error = `Failed! Please try again , ${e}`
                console.log('Failed!' , e)
                res.redirect('/signup?')
            })
    }catch(e){
        req.session.error = `Error! Please try again! , ${e}`
            console.log('Error!' , e)
                res.redirect('/signup?')
    }
})

router.get('/forgot?' , async(req , res) => {
    res.render('forgot' , {
        error : req.session.error,
        message : req.session.message
    })
    req.session.message = ''
    req.session.error = ''
})

router.post('/forgot?' , async(req , res) => {
    const { email } = req.body

    //finding the user
    try{
        let user = await User.findOne({ email })
        //if finding the user fails
        if(!user){
            req.session.error = 'This email is not registered!'
                console.log('Failed! Email not registered!')
                    return res.redirect('/forgot?')
        }

        //generating authenticating token
        const token = setUser(user)
            res.cookie('uid' , token)
                res.redirect(`/update/${user._id}`)
    }catch(e){
        req.session.error = `Error! Please try again! , ${e}`
            console.log('Error!' , e)
                res.redirect('/forgot?')
    }
})

router.get('/update/:id' , restrictToLoggedinUserOnly , async(req , res) => {
    res.render('update' , {
        error : req.session.error,
        message : req.session.message
    })
    req.session.message = ''
    req.session.error = ''
})

router.post('/update/:id' , restrictToLoggedinUserOnly , async(req , res) => {
    const { password , confirm_password } = req.body

    //if bith the passwords does'nt match
    try{
        if( password !== confirm_password ){
            req.session.error = 'Password does not match!'
            console.log('Failed! Password does not match!')
            return res.redirect(`/update/${req.user._id}`)
        }

        const email = req.user.email
        let user = await User.findOne({ email })
        
        //for not using the old password
        const isMatch = await bcrypt.compare(password , user.password)
        if(isMatch){
            req.session.error = 'New password cannot be same as old password!'
            console.log('Failed! New password cannot be same as old password!')
            return res.redirect(`/update/${req.user._id}`)
        }

        //saving the new password
        user.password = password
        await user.save()
            .then(() => {
                req.session.message = `Password successfully updated!`
                console.log('Successful!')
                req.session.email=''
                res.redirect(`/dashboard/${user._id}`)
            })
            .catch((e) => {
                req.session.error = `Failed! Please try again , ${e}`
                console.log('Failed!' , e)
                res.redirect(`/update/${req.user._id}`)
            })
    }catch(e){
        req.session.error = `Failed! Please try again`
            console.log('Failed!' , e)
                res.session.email = ''
                    res.redirect('/forgot?')
    }
})

router.get('/logout' , restrictToLoggedinUserOnly , async(req , res) => {
    const user = await User.findById(req.user._id)
    res.clearCookie('uid')
    user.cart = []
    await user.save()
    req.session.message = "You've been successfully logged out!"
    return res.redirect('/')
})

module.exports = router