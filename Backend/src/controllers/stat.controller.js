import { User } from "../models/user.model.js";
import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js"

export const getStats = async (req,res,next)=>{
    try {
        const [usersCount, songsCount, albumsCount, artistsCount] = Promise.all([
            await User.countDocuments(),
            await Song.countDocuments(),
            await Album.countDocuments(),
            await Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist"
                    }
                },
                {
                    $count: "count"
                }
            ])
        ])

        res.status(200).json({usersCount, songsCount, albumsCount, artistsCount})

    } catch (error) {
        console.log("error in getStats "+error);
        next(error)
    }
}