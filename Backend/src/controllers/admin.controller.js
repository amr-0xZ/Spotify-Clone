import cloudinary from "../lib/cloudinary.js"
import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"

const uploadToCloudinary = async (file)=>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
        resource_type: "auto"
        })

        return result.secure_url
    } catch (error) {
        console.log("error in uploading to cloudinary "+error);
        throw new Error("error in uploading to cloudinary")
    }
}

export const createSong = async (req,res,next)=>{
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "Please upload all files"})
        }

        const {title, artist, albumId, duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)

        const song = Song({
            title,
            artist,
            duration,
            imageUrl,
            audioUrl,
            albumId: albumId || null
        })

        await song.save()

        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push: {songs: song._id}
            })
        }

        return res.status(201).json(song)

    } catch (error) {
        console.log("error in createSong "+error);
        next(error)
    }
}