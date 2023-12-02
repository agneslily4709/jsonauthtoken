import express from "express"
import router from "./app/router.js"
const app = express()
app.use(express.json())

app.use("/api",router)

const PORT  = 5000
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`))