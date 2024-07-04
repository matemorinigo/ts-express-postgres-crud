import {IsNotEmpty, IsString, IsEnum, IsOptional} from "class-validator";


export enum Role{
    ADMIN = "ADMIN",
    USER = "USER"
}

export class CreateUserDTO{
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsOptional()
    @IsEnum(Role)
    role:string;
}