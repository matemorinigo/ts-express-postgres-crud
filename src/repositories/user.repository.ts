import { PrismaClient } from "@prisma/client";
import User from '@/utils/interfaces/user.interface'
import {Role} from '@/utils/dto/user.dto'

import bcrypt from 'bcrypt'


export default class UserRepository{
    private prisma = new PrismaClient();

    async getAllUsers():Promise<User[]|void>{
        return this.prisma.user.findMany();
    }

    async createUser(data:{username:string,password:string,role?:Role}):Promise<User|void>{

        let user:User|null= await this.prisma.user.findFirst({
            where:{
                username:data.username
            }
        });

        if(user)
            throw new Error("Username already exists");


        data.password = await bcrypt.hash(data.password, 12);

        return this.prisma.user.create({
            data: data
        });

    }

    async validateUser(data:{username:string,password:string}):Promise<Boolean|void>{
        let user = await this.prisma.user.findFirst({
            where:{
                username:data.username
            }
        });

        if(!user)
            throw new Error("User doesn't exists");

        return await bcrypt.compare(data.password, user.password);

    }

    async getUuidByUsername(username:string):Promise<User|null>{
        return this.prisma.user.findUnique({
            where:{
                username:username
            }
        })
    }
}