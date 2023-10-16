const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req , file , cb){
        return cb(null , 'public/uploads')
    } ,
    filename: function(req , file , cb){
        return cb(null , `${Date.now()}-${file.originalname}`)
    } 
})

const upload = multer({
    limits: {
        fileSize: 10000000,
    } , 
    storage
})

module.exports = upload