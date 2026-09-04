import {Router} from "express";
import {validate} from "../middlewares/validate.middleware.js";
import {createNoteSchema} from "../validators/note.validator.js";
import {create, fetchAllNotes} from "../controllers/note.controller.js";

const noteRouter: Router = Router();

noteRouter.post("/", validate(createNoteSchema), create);
noteRouter.get("/", fetchAllNotes);

export default noteRouter;