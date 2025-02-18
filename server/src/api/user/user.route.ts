import { Router } from "express";
const router = Router();
import { userController } from "./user.controller";
import { isAdmin, isAuthenticated } from "../../middleware/checkAuthenticated";

router.post('/register', userController.signupPostController);
router.post('/login', userController.loginPostController);
router.post('/logout', isAuthenticated, userController.logoutPostController);
router.post('/employee/register', isAuthenticated, isAdmin, userController.employeeAddPostController);
router.patch('/employee/edit/type/:employeeId', isAuthenticated, isAdmin, userController.employeeResponsiblityUpdateController);

export default router;