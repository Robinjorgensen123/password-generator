import express from "express"
import { signupUser, loginUser } from "../controllers/userController.js"
import { validateBody } from "../middlewares/validateBody.js"
import { signupUserSchema, loginUserSchema } from "../validators/userValidator.js"

const router = express.Router()

router.post("/signup", validateBody(signupUserSchema), signupUser)

router.post("/login", validateBody(loginUserSchema), loginUser)

export default router