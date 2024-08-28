// require('dotenv').config({path: './env'})

//approach 2
import dotenv from 'dotenv'
dotenv.config({
    path: './env'
})
import connectDB from './db/index.js';


/*
import mongoose from 'mongoose'
import { DB_NAME } from './constants';
import express from 'express'

//while handling with database always use try catch and async await

//in index we can connect database or in another folder and then call

const app = express();
//approach 1 (in index)

//use eifi ;()()

;( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>{
            console.log("Express not able to connect to database");
            throw error  
        })

        app.listen(process.env.PORT, () => {
            console.log("app is listning on port: ", process.env.PORT);
            
        })
    } catch (error) {
        console.error("Error: ", error);
    }
})()

*/



