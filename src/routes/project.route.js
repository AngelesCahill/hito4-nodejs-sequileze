import { Router } from 'express';
import { 
    getProjects, 
    createProject, 
    findAllProjectsByUserId, 
    updateProject, 
    deleteProject 
} from '../controllers/project.controller.js';
import { verifyToken } from '../controllers/auth.controller.js';

const router = Router();

router.get('/',verifyToken, getProjects);
router.get('/:userId', verifyToken, findAllProjectsByUserId);
router.post('/', verifyToken, createProject);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject); 

export default router;