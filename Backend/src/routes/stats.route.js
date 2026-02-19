import { Router } from "express";
import {protectRout, requireAdmin} from "../middlewares/auth.middleware.js"
import { getStats } from "../controllers/stat.controller.js";

const router = Router()


router.get('/', protectRout, requireAdmin, getStats)

export default router