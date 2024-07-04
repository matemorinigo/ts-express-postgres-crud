import {Request,Response,NextFunction} from "express";
import UserService from "@/services/user.service";
import HttpException from "@/utils/exceptions/http.exception";

export async function createUser(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
    let userService:UserService = new UserService();

    try{

        let user = await userService.createUser(req.body);

        res.status(200).json({user});

    }catch(e){
        next(new HttpException(409, "Cannot create user"))
    }
}


export async function getAllUsers(req:Request,res:Response,next:NextFunction):Promise<Response|void>{
    let userService:UserService = new UserService();

    try{
        let users = await userService.getAllUsers();

        res.status(200).json({users});

    }catch(e){
        next(new HttpException(400, "Cannot get all the users"))
    }
}