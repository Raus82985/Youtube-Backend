import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//there is a hook in mongoose (pre) :- agar koi user kuch save kar raha hai ya kuch v kar rah ahaui to usse just phale agar pre me kuch code daal diye to ye execute ho jayega then save karne wala kaaam hoga
const UserSchema = new mongoose.Schema({
    //id will be generated be mongodb itself
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        //it is used so that searching become easy
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    avatar: {
        type: String,   //cloudinary url
        required: true,
    },

    coverimage: {
        type: String,   //cloudinary url
    },

    //this is importent section as we can't store it in plain text
    password: {
        type: String,
        required: [true, 'Password is required']
    },

    //what is this?
    refreshToken: {
        type: String
    }


},{timestamps: true})

//whenever the user model is going to save in database this pre hook will run and check that if the password section is modified then it will encrypt it and then save it

//if condition is because agar avatar change kiye to v ye pre run ho jayega or password ko change kar dega to wo na ho isliye

//aacha isme direct call back nahi lete hai q ki ime this ka access nahio hota hai so yaha function likh ke function banate hai

//bcrypt takes time thats why async and also next vej diye q ki ye ek middlewere hai to wo next iska status return karega
UserSchema.pre("save", async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    return next();
})

//mongoose me phale se v kuch methods hote hai or hum apna custom methods v bna sakte hai

//isPasswordCorrect method ka naam hai

UserSchema.methods.isPasswordCorrect = async function(password) {
    //jaise pre ke paas this ka accessh hota hai waise hi iske paas v hota hai but agar () => {} aise call karte to this kaa accesss nahi hota

    //true or false vejta hai
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateFreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}


export const User = mongoose.model('User', UserSchema)


//basically hota ye hai ki jab user login karta hai to usko ek token milta hia or jab v user koi request kartha hai to saath me wo token vejta hai jisse prove hota hai ki ye user sahi hai but agar koi ye token chori ar liya to usko v datta mil jayega isliye iska expiry kam hota hai like 10min or 15 min or uske baad fir refresh token ke through new access token banta hai jo ki user ka new acces token ho jata hai or purana wala invilid ho jata hai 

//generally refresh token ka expiry jada hota hai like 10 day or 15 day or jab wo v expire ho jata hai to user ko fir se login karna parta hai