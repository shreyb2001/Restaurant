const express = require('express')
const { env } = require('yargs')
const path = require('path')
require('../db/mongoose')
const userRouter = require('../routers/user.Router')
const manageRouter = require('../routers/manageRouter')
const adminRouter = require('../routers/adminRouter')
const { setUser , getUser , restrictToLoggedinUserOnly, restrictTo } = require('../middlewares/auth')
const hbs = require('hbs')
const cookie = require('cookie-parser')
const session = require('express-session')
const app = express()
const { v4:uuidv4 } = require('uuid')
const port = 8001 || env

//define paths for express config.
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(express.static(publicDir))

//creating cookies
app.use(cookie())

//setting up session
app.use(session({
    secret: uuidv4(),
    resave:false,
    saveUninitialized:true
}))

//custom routers
app.use('/dashboard/admin/' , restrictToLoggedinUserOnly , restrictTo(['Admin']) , adminRouter)
app.use('/dashboard/' , manageRouter)
app.use('/' , userRouter)


//Set EJS as templating engine
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//creating a helper function
hbs.registerHelper('splitPath', (path) => {
    return path.split('public')[1] // Split the path using "/"
})

app.listen( port , () => console.log(`Server is up on port ${port}...`))