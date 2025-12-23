import { Router } from "express";
import { protectRout, requireAdmin } from "../middlewares/auth.middleware.js";
import { followUser, getAllUsers, getCurrentUser, getUserById } from "../controllers/user.controller.js";

const router = Router()

router.use(protectRout)

router.get('/', requireAdmin, getAllUsers)
router.get('/:id',getUserById)
router.get('/current', getCurrentUser)
router.post('/', followUser)
router.delete('/:id', unFollowUser)


export default router