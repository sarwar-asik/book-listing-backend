import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import { AuthValidation } from "./Auth.validation"
import { AuthController } from "./Auth.controller"

const router = Router()


router.post('/signup',validateRequest(AuthValidation.createUser),AuthController.signUpDB)

export const authRouter = router