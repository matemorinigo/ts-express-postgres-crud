import express, { Application } from 'express';
import { PrismaClient } from '@prisma/client';

import compression from 'compression' //compress requests
import cors from 'cors' //allow requests from different origins
import morgan from 'morgan' //logger

import Controller from '@/utils/interfaces/controller.interface'

import errorMiddleware from '@/middleware/error.middleware'

import helmet from 'helmet'

class App{
    public express: Application;
    public port: number;

    constructor(controllers:Controller[],port:number){
        this.express = express();
        this.port = port;
        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorMiddleware();
    }

    private initMiddleware(){
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(compression());
    }

    private initControllers(controllers:Controller[]){
        controllers.forEach((controller:Controller)=>{
            this.express.use('/api', controller.router);
        });
    }

    private initErrorMiddleware(){
       this.express.use(errorMiddleware);
    }

    public listen(){
        this.express.listen(this.port, ()=>{
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

export default App;


