import { Song } from "../models/song.model.js";
import {User} from "../models/user.model"


export const getAllSongs = async (req,res,next)=>{
    try {
        const songs = await Song.find().sort({createdAt: -1})
        res.status(200).json(songs)
    } catch (error) {
        console.log("error in getAllSongs "+error);
        next(error)
    }
}

export const getSongById = async (req,res,next)=>{
    try {
        const {id} = req.params
        const song = await Song.findById(id)

        if(!song){
            return res.status(404).json({message: "song not found"})
        }
        res.status(200).json(song)
    } catch (error) {
        console.log("error in getSongById "+error);
        next(error)
    }
}

export const getFeaturedSongs = async (req,res,next)=>{
    try {
        const featured = await Song.aggregate([
            {$sample: {siza: 6}}
        ])
        res.status(200).json(featured)
    } catch (error) {
        console.log("error in getFeaturedSongs "+error);
        next(error)
    }
}

export const getSongByName = async (req,res,next)=>{
    try {
        const {name} = req.params
        const songs = await Song.find({$text: {$search: name}})
        if(!songs){
            return res.status(404).json({message: "no songs found"})
        }
        res.status(200).json(songs)
    } catch (error) {
        console.log("error in getSongByName "+error);
        next(error)
    }
}

export const getForYou = async (req,res,next)=>{
    try {
        const songs = await Song.aggregate([{$sample: {size: 4}}])
        res.status(200).json(songs)
    } catch (error) {
        console.log("error in getForYou "+error);
        next(error)
    }
}

export const getTrending = async (req,res,next)=>{
    try {
        const songs = await Song.aggregate([{$sample: {size: 8}}])
        res.status(200).json(songs)
    } catch (error) {
        console.log("error in getTrending");
        next(error)
    }
}

export const getLikedSongs = async (req,res,next)=>{
    try {
        const uid = req.auth.userId
        const songs = await User.findOne({clerkId: uid}).populate("likedSongs")
        res.status(200).json(songs)
    } catch (error) {
        console.log("error in getLikedSongs "+error);
        next(error)
    }
}

export const likeSong = async (req,res,next)=>{
    try {
        const uid = req.auth.userId
        const songId = req.body
        const song = await Song.findById(songId)

        if(!song){
            return res.status(404).json({message: "song not found"})
        }

        await User.updateOne({clerkId: uid},{$addToSet:{likedSongs: songId}})

        res.status(200).json({success: true}, song)

    } catch (error) {
        console.log("error in likeSong "+error);
        next(error)
    }
}

export const unLikeSong = async (req,res,next)=>{
    try {
        const uid = req.auth.userId
        const songId = req.params
        const song = await Song.findById(songId)

        if(!song){
            return res.status(404).json({message: "song not found"})
        }

        await User.updateOne({clerkId: uid},{$pull:{likedSongs: songId}})
        
        res.status(200).json(song)

    } catch (error) {
        console.log("error in unlikeSong "+error);
        next(error)
    }
}