import { Router } from "express";
import { protectRout } from "../middlewares/auth.middleware.js";
import { getAlbumById, getAlbumByName, getAllAlbums } from "../controllers/album.controller.js";

const router = Router()

router.use(protectRout)

router.get('/', getAllAlbums)
router.get('/:id', getAlbumById)
router.get('/:name', getAlbumByName)

export default router