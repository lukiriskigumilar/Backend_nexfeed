import { compare } from "bcrypt";
import joi from "joi";

const registerSchema = joi.object(
    {
        username: joi.string().min(4).max(30).required(),
        password: joi.string().min(6).max(100).required(),
        confirm_password: joi.ref("password"),
    }
)

const loginSchema = joi.object(
    {
        username: joi.string().min(4).max(30).required(),
        password: joi.string().min(6).max(100).required(),
    }
)

export {
    registerSchema,
    loginSchema
}