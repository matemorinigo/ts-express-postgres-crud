import Task from '@/utils/interfaces/task.interface'
import TaskRepository from "@/repositories/task.repository";
import {Status} from "@/utils/dto/task.dto";



export default class TaskService{

    private TaskRepository = new TaskRepository();


    async create(title:string, description:string, username:string):Promise<Task>{

        try{
            return await this.TaskRepository.createTask(title,description, username);
        }catch(e){

            throw new Error('Unable to create task')
        }

    }

    async getAll():Promise<Task[]>{

        try{
            return await this.TaskRepository.getAllTasks();
        }catch(e){
            throw new Error('Unable to get tasks')
        }

    }

    async getByUUID(uuid:string,username:string):Promise<Task|null>{

        try{
            return await this.TaskRepository.getTaskByUUID(uuid,username);
        }catch(e){
            throw new Error('Unable to get task')
        }

    }

    async updateByUUID(uuid:string, data:{title?:string,description?:string,status?:Status,username:string}):Promise<Task|null>{

        try{
            return await this.TaskRepository.updateTaskByUUID(uuid, data);
        }catch(e){
            throw new Error('Unable to update task')
        }

    }

    async deleteByUUID(uuid:string, username:string):Promise<Task|null>{

        try{
            return await this.TaskRepository.deleteTaskByUUID(uuid,username);
        }catch(e){
            throw new Error('Unable to delete task')
        }

    }

    async getAllByUsername(username:string):Promise<Task[]|null>{
        try{
            return await this.TaskRepository.getTasksByUsername(username);
        }catch(e){
            throw new Error("Username doesn't exists")
        }
    }
}