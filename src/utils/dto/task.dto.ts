import {IsNotEmpty, IsString, IsOptional, IsEnum} from "class-validator";

export enum Status{
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export class CreateTaskDTO{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsOptional()
    @IsString()
    description?:string|null
}

export class UpdateTaskDTO{
    @IsOptional()
    @IsString()
    title?:string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsOptional()
    @IsEnum(Status)
    status?:string;

}