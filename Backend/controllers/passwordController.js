import Password from "../models/passwordModel.js"
import CryptoJS from "crypto-js"

// Skapa nytt lösenord
export const createPassword = async (req, res) => {
  try {
    const { website, username, password } = req.body
    const userId = req.user.id // hämtas från verifyJWT

    // Kryptera lösenordet innan det sparas
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.JWT_SECRET
    ).toString()

    const newPassword = new Password({
      userId,
      website,
      username,
      password: encryptedPassword,
    })

    await newPassword.save()

    res.status(201).json({ message: "Lösenord sparat", data: newPassword })
  } catch (error) {
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}

// Hämta alla lösenord för inloggad användare
export const getPasswords = async (req, res) => {
  try {
    const userId = req.user.id
    const passwords = await Password.find({ userId })

    // Dekryptera lösenorden innan de skickas till frontend
    const decryptedPasswords = passwords.map(p => ({
      ...p._doc,
      password: CryptoJS.AES.decrypt(p.password, process.env.JWT_SECRET).toString(CryptoJS.enc.Utf8),
    }))

    res.status(200).json(decryptedPasswords)
  } catch (error) {
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}

// Uppdatera lösenord
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params
    const { website, username, password } = req.body
    const userId = req.user.id

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.JWT_SECRET
    ).toString()

    const updated = await Password.findOneAndUpdate(
      { _id: id, userId },
      { website, username, password: encryptedPassword },
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ message: "Lösenord hittades inte" })
    }

    res.status(200).json({ message: "Lösenord uppdaterat", data: updated })
  } catch (error) {
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}

// Ta bort lösenord
export const deletePassword = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const deleted = await Password.findOneAndDelete({ _id: id, userId })

    if (!deleted) {
      return res.status(404).json({ message: "Lösenord hittades inte" })
    }

    res.status(200).json({ message: "Lösenord borttaget" })
  } catch (error) {
    res.status(500).json({ message: "Serverfel", error: error.message })
  }
}
