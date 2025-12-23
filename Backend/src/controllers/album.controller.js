import { Album } from "../models/album.model.js"


export const getAllAlbums = async (req,res,next)=>{
    try {
        const albums = await Album.find()
        res.status(200).json(albums)
    } catch (error) {
        next(error)
    }
}


export const getAlbumById = async (req,res,next)=>{
    try {
        const {id} = req.params
        const album = await Album.findById(id).populate("songs")
        if(!album){
            return res.status(404).json({message: "Album not found"})
        }
        res.status(200).json(album)
    } catch (error) {
        next(error)
    }
}


export const getAlbumByName = async (req,res,next)=>{
    try {
        const {name} = req.params
        const albums = await Album.find({$text: {$search: name}})
        if(!albums){
            return res.status(404).json({message: "no albums found"})
        }
        res.status(200).json(albums)
    } catch (error) {
        next(error)
    }
}