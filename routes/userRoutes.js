



const controller = require("../controllers/userController")

const express = require("express")
const router = express.Router()


router.post("/user-register",controller.userRegister)
router.post("/user-login" ,controller.userLogin)

module.exports=router