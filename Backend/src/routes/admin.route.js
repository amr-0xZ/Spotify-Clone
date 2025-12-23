import { Router } from "express";
import { protectRout, requireAdmin } from "../middlewares/auth.middleware.js";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";

const router = Router()

router.use(protectRout,requireAdmin)

router.post('/song', createSong)
router.delete('/song/:id', deleteSong)

router.post('/album', createAlbum)
router.delete('/album/:id',deleteAlbum)

router.get('/check',checkAdmin)

export default router