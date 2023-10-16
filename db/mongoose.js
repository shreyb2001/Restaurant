    const mongoose = require('mongoose')

    mongoose.connect('mongodb://localhost:27017/restaurant' , {
        useNewUrlParser : true
    })
        .then(() => console.log('Connected to the database...'))
        .catch((e) => console.error('Unable to connect to the database' , e))