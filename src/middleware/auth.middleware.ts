import {NextFunction, Request, Response} from "express";
import HttpException from "@/utils/exceptions/http.exception";
import jwt from "jsonwebtoken";

export default async function validateToken(req:Request, res:Response, next:NextFunction){
    const header:string = req.header("Authorization") || "";
    const token:string = header.split(" ")[1];

    if(!token)
        next(new HttpException(401,"Token not provided"));
    try{
        const payload:jwt.JwtPayload | string = jwt.verify(token,"SoyUnaClaveSecreta");
        if(typeof payload === "object" && "username" in payload){
            req.body.username = payload.username;
            next();
        }else{
            next(new HttpException(500, "Internal server error"));
        }

    }catch(e){
        next(new HttpException(403,"Invalid token"));
    }
}