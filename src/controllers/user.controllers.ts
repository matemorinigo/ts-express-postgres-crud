import {Request, Response, NextFunction, Router} from "express";
import UserService from "@/services/user.service";
import HttpException from "@/utils/exceptions/http.exception";
import validateRequest from "@/middleware/validation.middleware";
import {CreateUserDTO} from "@/utils/dto/user.dto";
import jwt from 'jsonwebtoken'


const userRouter = Router();
const userService:UserService = new UserService();

userRouter.get('/',async function (req:Request, res:Response, next:NextFunction):Promise<Response|void>{

    try{
        let users = await userService.getAllUsers();

        res.status(200).json({users});

    }catch(e){
        next(new HttpException(400, "Cannot get all the users"))
    }
})

userRouter.post('/',validateRequest(CreateUserDTO), async function(req:Request, res:Response, next:NextFunction)
    :Promise<Response|void>{

    try{

        let user = await userService.createUser(req.body);

        res.status(200).json({user});

    }catch(e){
        next(new HttpException(409, "Cannot create user"))
    }
})

userRouter.post('/login', async function(req:Request, res:Response, next:NextFunction):Promise<Response|void>{
    try{
        //Podrian ser 2 ifs y que el mensaje sea distino
        if(!req.body.username || !req.body.password)
            next(new HttpException(400,"Username and password are required"));

        if(await userService.validateUser(req.body)){
            const token = jwt.sign({username: req.body.username},
                "SoyUnaClaveSecreta", {expiresIn:"1h"});

            res.status(200).json({token});
        }
        else{
            next(new HttpException(401, "Authentication failed"));
        }

    }catch(e){
        next(new HttpException(500, "Internal server error"));
    }


})


export default userRouter



