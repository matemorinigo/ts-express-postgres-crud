import express, { Application } from 'express';

import compression from 'compression' //compress requests
import cors from 'cors' //allow requests from different origins
import morgan from 'morgan' //logger

import errorMiddleware from '@/middleware/error.middleware'

import helmet from 'helmet'

import taskRouter from "@/routes/task.routes";
import userRouter from "@/routes/user.routes";


const app:Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(compression());


app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

app.use(errorMiddleware);

export default app







