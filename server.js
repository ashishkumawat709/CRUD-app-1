const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000

const dotenv = require('dotenv')
dotenv.config({path:'config.env'})

const morgan = require('morgan')
app.use(morgan('tiny'))               //log requests

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended:true}))   //parse the request to body-parser

//connectDB name ka hmne fn create kiya tha usko require krk cal kiya h 
const connectDB= require('./server/database/connection')
connectDB()

app.set('view engine', 'ejs')     //set view engine

//load assets
app.use('/css', express.static(path.resolve(__dirname,'assets/css')))
app.use('/img', express.static(path.resolve(__dirname,'assets/img')))
app.use('/js', express.static(path.resolve(__dirname,'assets/js')))

//load routes
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{
    console.log( `listening port at,  http://localhost:${PORT}`);
})

