import { Request, Response, NextFunction } from "express";
import HttpException from '@/utils/exceptions/http.exception'

export default function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction){
    const status = error.status || 500;
    const message = error.message || 'Something went wrong'
}