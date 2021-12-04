import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {user , Document} from "../../model/model"
import { collections } from "../../service/database.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json()); 

export function userDeletContent(){}