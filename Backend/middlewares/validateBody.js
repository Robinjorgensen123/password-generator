// Använder Joi för att validera req.body innan controller körs

export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({
                message: "Valideringsfel",
                error: error.details[0].message,
            })
        }
        req.body = value

        next()
    }
}