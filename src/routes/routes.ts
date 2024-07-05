import { Router } from 'express'

import taskRouter from "@/controllers/task.controller";

import userRouter from "@/controllers/user.controllers";
import validateToken from "@/middleware/auth.middleware";

const router:Router = Router();


router.use('/tasks',validateToken, taskRouter);
router.use('/users', userRouter);

export default router
