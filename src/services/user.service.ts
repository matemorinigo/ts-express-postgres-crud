import UserRepository from "@/repositories/user.repository";
import User from '@/utils/interfaces/user.interface'
import {Role} from '@/utils/dto/user.dto'



export default class UserService{
    private UserRepository = new UserRepository();

    async getAllUsers():Promise<User[]|void>{
        try{
            return await this.UserRepository.getAllUsers();
        }catch(e){
            throw new Error("Unable to get users")
        }
    }

    async createUser(data:{username:string, password:string, role?:Role} ):Promise<User|void>{
        try{
            return await this.UserRepository.createUser(data);
        }catch(e){
            throw new Error("User already exists")
        }
    }

    async validateUser(data:{username:string,password:string}):Promise<Boolean|void>{
        try{
            return await this.UserRepository.validateUser(data);
        }catch(e:unknown){
            throw new Error("User doesn't exists");
        }
    }

    async getUuidByUsername(username:string):Promise<string>{
        let user = await this.UserRepository.getUuidByUsername(username);

        if(user)
            return user.id;
        else
            throw new Error("Username doesn't exists");

    }
}