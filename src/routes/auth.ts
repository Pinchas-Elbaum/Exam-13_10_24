import { Router } from "express";
import { studentRegister, teacherRegister, login  } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register/teacher", teacherRegister);
authRouter.post("/register/student", studentRegister);
authRouter.post("/login", login);

export default authRouter;