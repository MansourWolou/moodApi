// External Dependencies

import express, { Request, Response } from "express";
import {user } from "../../model/model"
import { collections } from "../../service/database.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());
export async function getAllUsers (_req: Request, res: Response) {
    try {
        console.log(_req.path);
        
        // Call find with an empty filter object, meaning it returns all documents in the collection. 
        //Saves as Game array to take advantage of types
        const users = (await collections.user?.find({}).toArray()) as user[];
        res.status(200).send(users);
    } catch (error ) {
        res.status(500).send(error);
    }
}