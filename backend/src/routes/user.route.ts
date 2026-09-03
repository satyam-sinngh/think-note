import {Router} from "express";
import {validate} from "../middlewares/validate.middleware.js";
import {loginSchema, registerSchema, verifyAccountSchema} from "../validators/auth.validator.js";
import {login, register, verify} from "../controllers/user.controller.js";

const router: Router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/verify", validate(verifyAccountSchema), verify);

router.post("/login", validate(loginSchema), login);

export default router;