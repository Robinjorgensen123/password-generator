import Joi from "joi";

// Användarnamn och lösen måste vara en sträng
// Felmeddelande om user skickar in t.ex. bara 1234 som userName eller lösen

const signupUserSchema = Joi.object({
    username: Joi.string()
        .alphanum() // enklast möjliga giltighetsregel
        .required()
        .messages({
            "string.base": "Username ska vara en sträng.",
            "string.alphanum": "Username får bara innehålla bokstäver och siffror.",
            "any.required": "Username är obligatoriskt.",
        }),

    password: Joi.string()
        .min(6)
        .pattern(new RegExp("[A-Z]"))
        .required()
        .messages({
            "string.base": "Lösenord ska vara en sträng.",
            "string.min": "Lösenordet måste vara minst 6 tecken.",
            "string.pattern.base": "Lösenordet måste innehålla minst en stor bokstav.",
            "any.required": "Lösenord är obligatoriskt.",
        }),
}).options({ stripUnknown: true });

const loginUserSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .required()
        .messages({
            "any.required": "Username är obligatoriskt.",
        }),

    password: Joi.string()
        .required()
        .messages({
            "any.required": "Lösenord är obligatoriskt.",
        }),
});

export { signupUserSchema, loginUserSchema };
