import Task from '@/utils/interfaces/task.interface'
import TaskRepository from "@/repositories/task.repository";


export default class TaskService{

    private TaskRepository = new TaskRepository();

    constructor() {

    }


    public async create(title:string, description:string):Promise<Task>{

        try{
            return await this.TaskRepository.createTask(title,description);
        }catch(e){
            throw new Error('Unable to create task')
        }

    }

    public async getAll():Promise<Task[]>{

        try{
            return await this.TaskRepository.getAllTasks();
        }catch(e){
            throw new Error('Unable to create task')
        }

    }

    public async getByUUID(uuid:string):Promise<Task|null>{

        try{
            return await this.TaskRepository.getTaskByUUID(uuid);
        }catch(e){
            throw new Error('Unable to create task')
        }

    }

    public async updateByUUID(uuid:string, data:{title?:string,body?:string}):Promise<Task|null>{

        try{
            return await this.TaskRepository.updateTaskByUUID(uuid, data);
        }catch(e){
            throw new Error('Unable to create task')
        }

    }

    public async deleteByUUID(uuid:string):Promise<Task|null>{

        try{
            return await this.TaskRepository.deleteTaskByUUID(uuid);
        }catch(e){
            throw new Error('Unable to create task')
        }

    }
}