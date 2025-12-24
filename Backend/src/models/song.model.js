import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    playCount: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: false
    }
}, {timestamps: true})

songSchema.index(
    {
        title: "text"
    }
)

export const Song = mongoose.model("Song",songSchema)