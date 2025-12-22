import { Router } from "express";
import { protectRout, requireAdmin } from "../middlewares/auth.middleware.js";
import { createSong, deleteSong } from "../controllers/admin.controller.js";

const router = Router()

router.post('/song',protectRout, requireAdmin, createSong)
router.delete('/song/:id',protectRout, requireAdmin, deleteSong)

export default router