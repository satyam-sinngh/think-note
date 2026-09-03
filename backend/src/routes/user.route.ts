import {Router} from "express";
import {validate} from "../middlewares/validate.middleware.js";
import {loginSchema, registerSchema, verifyAccountSchema} from "../validators/auth.validator.js";
import {login, me, register, verify} from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const router: Router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/verify", validate(verifyAccountSchema), verify);

router.post("/login", validate(loginSchema), login);

router.get("/me", authMiddleware, me);

export default router;