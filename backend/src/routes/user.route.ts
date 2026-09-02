import {Router} from "express";
import {validate} from "../middlewares/validate.middleware.js";
import {registerSchema} from "../validators/auth.validator.js";
import {register} from "../controllers/user.controller.js";

const router: Router = Router();

router.post("/register", validate(registerSchema), register);

export default router;