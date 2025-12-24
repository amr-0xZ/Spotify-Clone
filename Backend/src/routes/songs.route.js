import { Router } from "express";
import { protectRout, requireAdmin } from "../middlewares/auth.middleware.js";
import { getAllSongs, getFeaturedSongs, getForYou, getLikedSongs, getSongById, getSongByName, getTrending, likeSong, unLikeSong } from "../controllers/song.controller.js";

const router = Router()

router.use(protectRout)

router.get('/',requireAdmin,getAllSongs)
router.get('/:id',getSongById)
router.get('/:name', getSongByName)
router.get('/featured',getFeaturedSongs)
router.get('/foryou', getForYou)
router.get('/trending', getTrending)
router.get('/liked', getLikedSongs)
router.post('/', likeSong)
router.delete('/:id', unLikeSong)

export default router