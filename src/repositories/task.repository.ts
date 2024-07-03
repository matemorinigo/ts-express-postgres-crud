import {PrismaClient} from '@prisma/client'
import Task from '@/utils/interfaces/task.interface'

export default class TaskRepository{
    private prisma:PrismaClient = new PrismaClient();

    public async createTask(title:string, description:string):Promise<Task>{
        return this.prisma.task.create({
            data:{
                title:title,
                description:description
            }
        })
    }

    public async getAllTasks():Promise<Task[]>{
        return this.prisma.task.findMany();
    }

    public async getTaskByUUID(uuid:string):Promise<Task|null>{
        return this.prisma.task.findUnique({
            where:{id:uuid}
        });
    }

    public async updateTaskByUUID(uuid:string, data:{title?:string,body?:string}):Promise<Task|null>{
        return this.prisma.task.update({
            where:{id:uuid},
            data:data
        });
    }

    public async deleteTaskByUUID(uuid:string):Promise<Task|null>{
        return this.prisma.task.delete({
            where:{id:uuid}
        });
    }
}