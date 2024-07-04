import { Router } from 'express'

import { CreateUserDTO } from "@/utils/dto/user.dto";

import { getAllUsers, createUser } from '@/controllers/user.controllers'

import validateRequest from "@/middleware/validation.middleware";

const userRoutes = Router();

userRoutes.get('/',getAllUsers)

userRoutes.post('/',validateRequest(CreateUserDTO), createUser)

export default userRoutes
