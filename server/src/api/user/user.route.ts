import { Router } from "express";
const router = Router();
import { userController } from "./user.controller";

router.post('/register', userController.signupPostController);

export default router;