import { Router } from "express";
const router = Router();
import { isAuthenticated, isCoordinator } from "../../middleware/checkAuthenticated";
import { projectController } from "./project.controller";


router.post('/add', isAuthenticated, isCoordinator, projectController.projectAddPostController);
router.patch('/edit/:projectId', isAuthenticated, isCoordinator, projectController.projectUpdateController);

export default router;