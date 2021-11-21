// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {user , Document} from "../model/model"
import { collections } from "../service/database.service";
import {User} from "../model/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());

export async function getUserById(req: Request, res: Response) {
    const id = req?.params?.id;

    try {
        // _id in MongoDB is an objectID type so we need to find our specific document by querying
        const query = { _id: new ObjectId(id) };
        const user = (await collections.user?.findOne(query)) as user;
console.log(user)
        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}