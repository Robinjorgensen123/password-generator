import User from "../models/userModel.js"
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken" 

const signupUser = async (req, res) => {
  const { username, password } = req.body

  try {
    // Kolla om användarnamnet redan finns
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({ message: "Det finns redan en användare med detta username." })
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10)

    // Skapa ny användare och spara till databasen
    const newUser = new User({
      username,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({
      message: "Skapat ny användare.",
      data: {
        username: newUser.username,
        _id: newUser._id,
      },
    })
  } catch (error) {
    console.error("Fel vid skapande av användare:", error)
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}
   
// LOGGA IN

const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ message: "Användaren finns ej." })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Fel inloggningsuppgifter." })
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(200).json({
      message: "Inloggad användare",
      token,
      user: {
        username: user.username,
        id: user._id,
      }
    })
  } catch (error) {
    console.error("Fel vid inloggning:", error)
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}

export { signupUser, loginUser }