import {PrismaClient} from '@prisma/client'
import Task from '@/utils/interfaces/task.interface'

export default class TaskService{

    static prisma = new PrismaClient();

    public async create(title:string, body:string):Promise<Task>{

        try{
            const task = TaskService.prisma.task.create(
                {data:{
                        title:title,
                        description:body
                    }
                });
            return task;
        }catch(e){
            throw new Error('Unable to create task')
        }

    }
}