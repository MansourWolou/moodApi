
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

export async function userUpdateData (req: Request, res: Response)  {
    const id = req?.params?.id;

    try {
        const updatedGame: User = req.body as User;
        const query = { _id: new ObjectId(id) };
        // $set adds or updates all fields
        const result = await collections.user?.updateOne(query, { $set: updatedGame });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}