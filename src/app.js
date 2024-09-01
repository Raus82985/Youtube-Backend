import express from "express"
import cors from 'cors'
import cookieparser from 'cookie-parser'


const app = express()

//cors ko configered asie karte hai
app.use(cors({
    // means from these origin only request will accepted
    origin: process.env.CORS_ORIGIN,
    credentials: true
    // there are other things like whitelisting
}))
//there are other features as well like set origin that from which origin backend accept request ald other things

//it is like setting the limit that what amount of json server will accept
//ye sab data to body ke through aata h
app.use(express.json({limit: "16kb"}))

//now i want ki url se data liya jaa sake so uske liye
//when ever we do search anywhere then it replace space with special charecter (generally %20) so we need url encoder which is again comes from express
//here also we set the limit that what amount of data we take from url 
app.use(express.urlencoded({extended: true, limit: '16kb'}))

//there are some public folder which is thair so that all the pdf or files can be stored which can be access by anyone
app.use(express.static("Public"))

//here these cookie is generated, read and delet by server only for security purpose
app.use(cookieparser())
export { app }