import { Router } from "express";
const router = Router();
import { isAdmin, isAssistant, isAuthenticated, isCoordinator } from "../../middleware/checkAuthenticated";
import { projectController } from "./project.controller";


router.post('/add', isAuthenticated, isCoordinator, projectController.projectAddPostController);
router.patch('/edit/:projectId', isAuthenticated, isCoordinator, projectController.projectUpdateController);
router.patch('/update/status/:projectId', isAuthenticated, isCoordinator, projectController.projectStatusUpdateController);
router.delete('/delete/:projectId', isAuthenticated, isCoordinator, projectController.projectDeleteController);
router.get('/', isAuthenticated, isAdmin, projectController.projectRetrieveController);
router.get('/recent', isAuthenticated, isAdmin, projectController.recentProjectRetrieveController);
router.get('/all/assistant/:assistantId', isAuthenticated, isAssistant, projectController.assistantProjectRetrieveController);
router.get('/all/coordinator/:coordinatorId', isAuthenticated, isCoordinator, projectController.coordinatorProjectRetrieveController);
router.get('/recent/coordinator/:coordinatorId', isAuthenticated, isCoordinator, projectController.recentProjectOfCoordinatorController);
router.get('/recent/assistant/:assistantId', isAuthenticated, isAssistant, projectController.recentProjectOfAssistantController);
router.post('/generate-report', isAuthenticated, isAdmin, projectController.generateProjectReport);

export default router;