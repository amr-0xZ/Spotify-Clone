import { Router } from "express";

const router = Router()

router.get('/', (req,res)=>{
    res.send('admin requested in GET')
})

export default router