/*
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


async function createTask(title:string, description:string){
    await prisma.task.create({data:{
            title:title,
            description:description
        }});

}

async function getAllTasks(){
    const allTasks = await prisma.task.findMany();

    console.dir(allTasks, { depth: null });
}

async function main(){
    await getAllTasks();
    await createTask("Finish the ts express & postgres task",
        "Finish the backend implementation of a Task Manager")
    await getAllTasks();
}

main()
    .then(async ()=>{
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.error(e);
        await prisma.$disconnect();
        process.exit(1)
    });

*/
import 'dotenv/config'

import 'module-alias/register'

import App from './app'
import TaskController from "@/controllers/task.controller";

const app = new App([
    new TaskController()
],Number(process.env.PORT));

app.listen();
