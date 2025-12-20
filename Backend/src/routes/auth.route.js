import { Router } from "express";
import { authCalback } from "../controllers/auth.controller.js";

const router = Router()

router.post('/callback', authCalback)

export default router