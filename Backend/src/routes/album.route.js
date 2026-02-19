import { Router } from "express";
import { getAlbumById, getAlbumByName, getAllAlbums } from "../controllers/album.controller.js";

const router = Router()

router.get('/', getAllAlbums)
router.get('/:id', getAlbumById)
router.get('/:name', getAlbumByName)

export default router