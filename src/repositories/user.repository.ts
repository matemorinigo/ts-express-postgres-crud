import { PrismaClient } from "@prisma/client";
import User from '@/utils/interfaces/user.interface'
import {Role} from '@/utils/dto/user.dto'


export default class UserRepository{
    private prisma = new PrismaClient();

    public async getAllUsers():Promise<User[]|void>{
        return this.prisma.user.findMany();
    }

    public async createUser(data:{username:string,password:string,role?:Role}):Promise<User|void>{

        let user:User|null= await this.prisma.user.findFirst({
            where:{
                username:data.username
            }
        });

        if(user)
            throw new Error("Username already exists");
        else
            return this.prisma.user.create({
                data:data
            });

    }
}