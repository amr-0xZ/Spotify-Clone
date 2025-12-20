import { Router } from "express";

const router = Router()

router.get('/', (req,res)=>{
    res.send("stats requested in GET method")
})

export default router