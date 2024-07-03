import { IsNotEmpty, IsString, IsOptional} from "class-validator";

export class CreateTaskDTO{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsOptional()
    @IsString()
    description?:string|null
}