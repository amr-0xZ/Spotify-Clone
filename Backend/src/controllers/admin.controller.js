import cloudinary from "../lib/cloudinary.js"
import { Album } from "../models/album.model.js"
import { Song } from "../models/song.model.js"


// helper function
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

        const {title, artist, albumId, duration, tag} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile)
        const imageUrl = await uploadToCloudinary(imageFile)

        const song = new Song({
            title,
            tag,
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


export const deleteSong = async (req,res,next)=>{
    try {
        const {id} = req.params
        const song = await Song.findById(id)

        if(song){
            if(song.albumId){
                await Album.findByIdAndUpdate(song.albumId,{
                    $pull: {songs: song._id}
                })
            }
            await Song.findByIdAndDelete(id)
            return res.status(200).json({message: "Song deleted successfully"})
        }else{
            return res.status(400).json({message: "song not found"})
        }

    } catch (error) {
        console.log("error in delete song "+error);
        next(error)
    }
}


export const createAlbum = async (req,res,next)=>{
    try {
        const {title, artist, releaseYear} = req.body
        const {imageFile} = req.files
        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        })

        await album.save()
        res.status(201).json(album)
    } catch (error) {
        console.log("error in create album "+error);
        next(error)
    }
}


export const deleteAlbum = async (req,res,next)=>{
    try {
        const {id} = req.params
        const album = await Album.findById(id)
        if(album){
            await Song.deleteMany({albumId: id})
            await Album.findByIdAndDelete(id)
            res.status(200).json({message: "Album deleted"})
        }
    } catch (error) {
        console.log("error in delete album "+error);
        next(error)
    }
}


export const checkAdmin = async (req,res,next)=>{
    return res.status(200).json({admin:true})
}