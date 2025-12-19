import express from "express"
import dotenv from "dotenv"
import userRouts from "./routes/user.route.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT


app.use("/api/users", userRouts)
app.use("/api/auth", authRouts)
app.use("/api/admin", adminRouts)
app.use("/api/songs", songRouts)
app.use("/api/albums", albumRouts)
app.use("/api/stats", statRouts)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})