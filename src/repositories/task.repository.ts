import {PrismaClient} from '@prisma/client'
import Task from '@/utils/interfaces/task.interface'
import UserService from "@/services/user.service";
import {Status} from "@/utils/dto/task.dto";

export default class TaskRepository{
    private prisma:PrismaClient = new PrismaClient();
    private userService = new UserService();

    async createTask(title:string, description:string, username:string):Promise<Task>{
        let uuid:string = await this.userService.getUuidByUsername(username);
        return this.prisma.task.create({
            data:{
                title:title,
                description:description,
                userId:uuid
            }
        })
    }

    async getAllTasks():Promise<Task[]>{
        return this.prisma.task.findMany();
    }

    async getTaskByUUID(uuid:string,username:string):Promise<Task|null>{
        let uuidUser = await this.userService.getUuidByUsername(username);
        return this.prisma.task.findUnique({
            where:{
                id:uuid,
                userId:uuidUser
            }
        });
    }

    async updateTaskByUUID(uuid:string, data:{title?:string,description?:string,status?:Status, username:string})
        :Promise<Task|null>{
        let uuidUser = await this.userService.getUuidByUsername(data.username);
        return this.prisma.task.update({
            where:{
                id:uuid,
                userId:uuidUser
            },
            data:{
                title:data.title,
                description:data.description,
                status:data.status
            }
        });
    }

    async deleteTaskByUUID(uuid:string, username:string):Promise<Task|null>{
        let uuidUser = await this.userService.getUuidByUsername(username);
        return this.prisma.task.delete({
            where:{
                id:uuid,
                userId:uuidUser
            }
        });
    }

    async getTasksByUsername(username:string):Promise<Task[]|null>{
        try{
            let uuid = await this.userService.getUuidByUsername(username)
            return this.prisma.task.findMany({
                where:{
                    userId:uuid
                }
            });
        }catch(e){
            throw new Error("Username doesn't exists");
        }

    }
}