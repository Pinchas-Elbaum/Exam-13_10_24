import { Router } from "express";
import { TeacherRegister, StudentRegister, login } from "../controllers/userController";

const authRouter = Router();

authRouter.post("/register/teacher", TeacherRegister);
authRouter.post("/register/student", StudentRegister);
authRouter.post("/login", login);

export default authRouter;
