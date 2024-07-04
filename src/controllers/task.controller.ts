import { Request, Response, NextFunction} from "express";

import HttpException from "@/utils/exceptions/http.exception";
import TaskService from "@/services/task.service";



async function createTask(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
   let taskService:TaskService = new TaskService();

    try{
        const {title, description} = req.body;

        const task = await taskService.create(title, description);

        res.status(201).json({task});

    }catch(e){
        next(new HttpException(400,'Cannot create the task'));
    }
}

async function getAllTasks(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
    let taskService:TaskService = new TaskService();

    try{

        const task = await taskService.getAll();

        res.status(200).json({task});

    }catch(e){
        next(new HttpException(400,'Cannot get the tasks'));
    }
}

async function getTaskByUUID(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
    let uuid = req.params[0]

    let taskService:TaskService = new TaskService();

    try{

        const task = await taskService.getByUUID(uuid);

        if(task)
            res.status(200).json({task});
        else{
            res.status(404).json({message:"There is no task with that ID"})
        }

    }catch(e){
        next(new HttpException(400,'Cannot get the task'));
    }
}

async function updateTask(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
    let uuid = req.params[0];

    let data:{title?:string,body?:string} = req.body

    let taskService:TaskService = new TaskService();

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
}

async function deleteTask(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
    let uuid = req.params[0]

    let taskService:TaskService = new TaskService();

    try{

        const task = await taskService.deleteByUUID(uuid);

        if(task)
            res.status(200).json({task});
        else{
            res.status(404).json({message:"There is no task with that ID"})
        }

    }catch(e){
        next(new HttpException(400,'Cannot delete the task'));
    }
}


export {createTask, getAllTasks, getTaskByUUID, updateTask,deleteTask}

