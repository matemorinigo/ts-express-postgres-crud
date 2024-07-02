import { Router, Request, Response, NextFunction} from "express";

import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import TaskService from "@/services/task.service";

class TaskController implements Controller{
    public path = '/tasks';
    public router = Router();
    private TaskService = new TaskService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(){
        this.router.post(`${this.path}`, this.create);
    }

    private create = async (
        req: Request, res: Response, next: NextFunction
    ):Promise<Response|void> => {
        try{
            const {title, description} = req.body;

            const task = await this.TaskService.create(title, description);

            res.status(201).json({task});

        }catch(e){
            next(new HttpException(400,'Cannot create the task'));
        }
    }
}

export default TaskController;