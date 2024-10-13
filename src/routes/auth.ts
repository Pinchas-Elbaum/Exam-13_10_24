import { Router } from "express";
import {teacherRegister, studentRegister } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register/teacher", teacherRegister);

authRouter.post("/register/student", studentRegister);


export default authRouter;