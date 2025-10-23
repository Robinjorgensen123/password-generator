import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Kontrollerar att JWT-token finns i Authorization-header.
// Min hemliga nyckel JWT_SECRET avnänds för att verifiera tokenens signatur.
export default function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ message: "Token saknas" })

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token är inte giltig" })

        req.user = decoded

        next()
    })
}