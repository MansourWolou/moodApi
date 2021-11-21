// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {user , Document} from "../model/model"
import { collections } from "../service/database.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());

export async  function createUserAccount (req: Request, res: Response) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.pwd, salt)
        const newUser : user = {
            name: req.body.name,
            pwd: hashedPassword,
            email: req.body.email,
            schemaVersion: 1
        }
        let result : any;
        /**
         * * check if the user already exist by cheking the email in the database
         */
      const userData = (await collections.user?.findOne({ email : req.body.email}) ) as user; //find the best way to make sure that the type is Document befor converting it to user
        console.log( userData)
      if ( req.body.email != userData["email"]) {// if the new user is not already in the DB create it
            result = await collections.user?.insertOne(newUser);
        }
        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}