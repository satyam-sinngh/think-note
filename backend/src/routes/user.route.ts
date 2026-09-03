import {Router} from "express";
import {validate} from "../middlewares/validate.middleware.js";
import {registerSchema, verifyAccountSchema} from "../validators/auth.validator.js";
import {register, verify} from "../controllers/user.controller.js";

const router: Router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/verify", validate(verifyAccountSchema), verify);

export default router;