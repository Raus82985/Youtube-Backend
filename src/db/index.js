import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//mongoose return me ek object deta hai


const connectDB = async () => {
    try {
        
        const connectionInstane = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstane.connection.host} !! PORT: ${process.env.PORT}`);   
    } catch (error) {
        
        console.log("Mongodb connection Failed: ", error);
        process.exit(1) /*or throw.error */
    }
}

connectDB()

export default connectDB;