import express from "express"
import verifyJWT from "../middlewares/verifyJWT.js"
import { 
  createPassword, 
  getPasswords, 
  updatePassword, 
  deletePassword 
} from "../controllers/passwordController.js"

const router = express.Router()

// Alla dessa routes skyddas med verifyJWT
router.post("/", verifyJWT, createPassword)
router.get("/", verifyJWT, getPasswords)
router.put("/:id", verifyJWT, updatePassword)
router.delete("/:id", verifyJWT, deletePassword)

export default router