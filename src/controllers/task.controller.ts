import {Request, Response, NextFunction, Router} from "express";

import HttpException from "@/utils/exceptions/http.exception";
import TaskService from "@/services/task.service";
import validateRequest from "@/middleware/validation.middleware";

import {CreateTaskDTO, Status, UpdateTaskDTO} from "@/utils/dto/task.dto";

const taskRouter = Router();
const taskService:TaskService = new TaskService();

taskRouter.get('/',async function(req:Request, res:Response, next:NextFunction):Promise<Response|void>{

    try{
        const username = req.body.username
        const task = await taskService.getAllByUsername(username);
        res.status(200).json({task});

    }catch(e){
        console.log(e);
        next(new HttpException(400,'Cannot get the tasks'));
    }
});
taskRouter.get('/:uuid',
    async function(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
        let uuid = req.params.uuid
        const username = req.body.username

        try{

            const task = await taskService.getByUUID(uuid,username);

            if(task)
                res.status(200).json({task});
            else{
                res.status(404).json({message:"There is no task with that ID"})
            }

        }catch(e){
            next(new HttpException(400,'Cannot get the task'));
        }
    });

taskRouter.post('/',validateRequest(CreateTaskDTO),async function (req:Request, res:Response, next:NextFunction):Promise<Response|void>{

        try{
            const {title, description, username} = req.body;

            const task = await taskService.create(title, description, username);

            res.status(201).json({task});

        }catch(e){
            console.log(e);
            next(new HttpException(400,'Cannot create the task'));
        }
    }
);

taskRouter.put('/:uuid',validateRequest(UpdateTaskDTO),
    async function (req:Request, res:Response, next:NextFunction):Promise<Response|void>{
        const uuid = req.params.uuid;

        const data:{title?:string,description?:string,status?:Status,username:string} = req.body


        try{

            const task = await taskService.updateByUUID(uuid, data);

            if(task)
                res.status(200).json({task});
            else{
                res.status(404).json({message:"There is no task with that ID"})
            }

        }catch(e){
            next(new HttpException(400,'Cannot update the task'));
        }
    });

taskRouter.delete('/:uuid',
    async function(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
        const uuid = req.params.uuid

        try{

            const task = await taskService.deleteByUUID(uuid,req.body.username);

            if(task)
                res.status(200).json({task});
            else{
                res.status(404).json({message:"There is no task with that ID"})
            }

        }catch(e){
            next(new HttpException(400,'Cannot delete the task'));
        }
    });

export default taskRouter

