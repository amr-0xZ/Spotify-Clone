import express from "express"
import dotenv from "dotenv"
import {clerkMiddleware} from "@clerk/express"
import fileUpload from "express-fileupload"
import path from "path"

import connectDB from "./lib/db.js"

import userRouts from "./routes/user.route.js"
import statRouts from "./routes/stats.route.js"
import albumRouts from "./routes/album.route.js"
import songRouts from "./routes/songs.route.js"
import adminRouts from "./routes/admin.route.js"
import authRouts from "./routes/auth.route.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()
const NODE_MODE = process.env.NODE_MODE

app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname,"temp"),
    createParentPath: true,
    limits: {
        fileSize: 10*1024*1024 //10MB
    }
}))

app.use("/api/users", userRouts)
app.use("/api/auth", authRouts)
app.use("/api/admin", adminRouts)
app.use("/api/songs", songRouts)
app.use("/api/albums", albumRouts)
app.use("/api/stats", statRouts)


app.use((err,req,res,next)=>{
    return res.status(500).json({message: NODE_MODE==="production"? "Internal server error" : err.message})
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})