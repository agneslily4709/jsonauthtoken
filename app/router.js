import express from "express"
import {checkApi, login,details, logout} from "./controller.js"
const router = express.Router()

router.get("/checkApi",checkApi)
router.post("/login",login)
router.get("/details",details)
router.get("/logout",logout)

export default router