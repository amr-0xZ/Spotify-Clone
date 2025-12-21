import { Router } from "express";
import { protectRout, requireAdmin } from "../middlewares/auth.middleware.js";
import { createSong } from "../controllers/admin.controller.js";

const router = Router()

router.post('/song',protectRout, requireAdmin, createSong)

export default router