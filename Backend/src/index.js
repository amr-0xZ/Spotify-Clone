import express from "express"
import dotenv from "dotenv"

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

app.use(express.json())

app.use("/api/users", userRouts)
app.use("/api/auth", authRouts)
app.use("/api/admin", adminRouts)
app.use("/api/songs", songRouts)
app.use("/api/albums", albumRouts)
app.use("/api/stats", statRouts)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})