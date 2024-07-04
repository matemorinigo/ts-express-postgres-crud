import { Router } from 'express'
import {CreateTaskDTO} from '@/utils/dto/task.dto'
import validateRequest from '@/middleware/validation.middleware'
import {createTask, getAllTasks, getTaskByUUID, updateTask, deleteTask} from "@/controllers/task.controller";


const taskRouter = Router();

taskRouter.get('/',getAllTasks);
taskRouter.get(/^\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/,
    getTaskByUUID);

taskRouter.post('/', validateRequest(CreateTaskDTO),createTask);

taskRouter.put(/^\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/,
    updateTask);

taskRouter.delete(/^\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/,
    deleteTask);

export default taskRouter