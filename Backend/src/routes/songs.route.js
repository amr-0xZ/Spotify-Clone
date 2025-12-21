import { Router } from "express";

const router = Router()

router.get('/',(req,res)=>{
    res.status(200).json({song1:{name: "Not you", artist: "Emenem"}})
})

export default router