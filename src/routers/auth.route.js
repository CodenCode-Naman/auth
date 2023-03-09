const express = require("express")
const router = express()
router.use(express.json())
const controller = require("../controllers/auth.controllers.js")
const middleware = require("../middlewares/auth.middleware.js")

router.post("/register",middleware.credentialsValidator, controller.registerUser)
router.post("/login",middleware.credentialsValidator, controller.loginUser)
router.post("/token/validation",middleware.tokenValidator, controller.validateToken)
module.exports = router