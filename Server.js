require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes/Routes')
const route  = require('./routes/adminroute')

// database 
mongoose.connect(process.env.dburl)
    .then(() => 
    {
        app.listen(process.env.PORT, (err) => 
        {
            if(err)
            {
                throw Error(err)
            }
            // console.log('listening on port 4000');
            // console.log('connected to database')
        })  
    })
    .catch(err => {throw Error(err)})

// middleware
app.use(express.json())

app.use((req,res,next)=>
{
    // console.log(req.path,req.method)
    next()
})

app.use(cors())

// routes
app.use('/api/upload',router)
app.use('/api/upload',route)