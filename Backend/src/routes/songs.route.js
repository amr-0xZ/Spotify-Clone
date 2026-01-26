import { Router } from "express";
import { protectRout, requireAdmin } from "../middlewares/auth.middleware.js";
import { getAllSongs, getFeaturedSongs, getForYou, getLikedSongs, getSongById, getSongByName, getTrending, likeSong, unLikeSong } from "../controllers/song.controller.js";

const router = Router()

router.get('/',protectRout,requireAdmin,getAllSongs)
router.get('/:id',getSongById)
router.get('/:name', getSongByName)
router.get('/featured',getFeaturedSongs)
router.get('/foryou',protectRout, getForYou)
router.get('/trending', getTrending)
router.get('/liked',protectRout, getLikedSongs)
router.post('/',protectRout, likeSong)
router.delete('/:id',protectRout, unLikeSong)

export default router