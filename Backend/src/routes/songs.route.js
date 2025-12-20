import { Router } from "express";

const router = Router()

router.get('/',(req,res)=>{
    res.send('songs requested in GET')
})

export default router