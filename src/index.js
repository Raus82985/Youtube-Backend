// require('dotenv').config({path: './env'})

//approach 2
import dotenv from 'dotenv'
import {app} from './app.js'
dotenv.config({
    path: './env'
})
import connectDB from './db/index.js';
connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Failed to Listen with error", error);
        process.exit(1); 
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is runnig at PORT: ${process.env.PORT || 8000}`);
    })
})
.catch((err) => {
    console.log("connection failed with Index/DB : ", err);
    
})


/*
import mongoose from 'mongoose'
import { DB_NAME } from './constants';
import express from 'express'

//while handling with database always use try catch and async await

//in index we can connect database or we cam write in another folder and then call
//ye index me hi connect kar rahe hai

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



