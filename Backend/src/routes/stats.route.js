import { Router } from "express";
import {protectRout, requireAdmin} from "../middlewares/auth.middleware.js"

const router = Router()


router.get('/', protectRout, requireAdmin, getStats)

export default router