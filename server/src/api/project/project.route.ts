import { Router } from "express";
const router = Router();
import { isAuthenticated, isCoordinator } from "../../middleware/checkAuthenticated";
import { projectController } from "./project.controller";


router.post('/add', isAuthenticated, isCoordinator, projectController.projectAddPostController);

export default router;