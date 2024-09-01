import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//mongoose return me ek object deta hai


const connectDB = async () => {
    try {
        //uska url/kaun sa data base hai uska naam
        const connectionInstane = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstane.connection.host} !! PORT: ${process.env.PORT}`);    
    } catch (error) {
        console.log("Mongodb connection Failed: ", error);
        process.exit(1) /*or throw.error */
    }
}
//on calling this function it will give promise so whereever this database is imported and then called so then after we need to handel the promises
export default connectDB;