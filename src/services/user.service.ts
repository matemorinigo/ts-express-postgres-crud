import UserRepository from "@/repositories/user.repository";
import User from '@/utils/interfaces/user.interface'
import {Role} from '@/utils/dto/user.dto'



export default class UserService{
    private UserRepository = new UserRepository();

    public async getAllUsers():Promise<User[]|void>{
        try{
            return await this.UserRepository.getAllUsers();
        }catch(e){
            throw new Error("Unable to get users")
        }
    }

    public async createUser(data:{username:string, password:string, role?:Role} ):Promise<User|void>{
        try{
            return await this.UserRepository.createUser(data);
        }catch(e){
            throw new Error("User already exists")
        }
    }
}