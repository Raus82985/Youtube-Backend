import mongoose from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new mongoose.Schema({
    videofile: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
        required: true,
    },

    //video Uploader
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String,
        required: true,
    },

    discription: {
        type: String,
        required: true,
    },

    duration: {
        type: Number,       //cloudinary se hi milta hai
        required: true,
    },

    views:{
        type: Number,
        default: 0,
    },

    ispublished: {
        type: Boolean,
        default: true,
    }

} ,{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video  = mongoose.model("Video", videoSchema)