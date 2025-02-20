import { Router } from "express";
const router = Router();
import { isAssistant, isAuthenticated, isCoordinator } from "../../middleware/checkAuthenticated";
import { projectController } from "./project.controller";


router.post('/add', isAuthenticated, isCoordinator, projectController.projectAddPostController);
router.patch('/edit/:projectId', isAuthenticated, isCoordinator, projectController.projectUpdateController);
router.patch('/update/status/:projectId', isAuthenticated, isCoordinator, projectController.projectStatusUpdateController);
router.delete('/delete/:projectId', isAuthenticated, isCoordinator, projectController.projectDeleteController);
router.get('/all', isAuthenticated, projectController.projectRetrieveController);
router.get('/all/assistant/:employeeId', isAuthenticated, isAssistant, projectController.assistantProjectRetrieveController);

export default router;