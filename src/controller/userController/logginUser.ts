// External Dependencies

import express, { Request, Response } from "express";
import {user } from "../../model/model"
import { collections } from "../../service/database.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
import dotenv from 'dotenv';

// Global Config

dotenv.config();
let  SECRET: string ;
if (typeof process.env.SECRET === "string") {
    SECRET = process.env.SECRET;
}

export const userRouter = express.Router();

userRouter.use(express.json());

export async function logginUser (req: Request, res: Response)  {
    try {
        /**
         * * check if the user already exist in the database
         * * send null if the user don't exist in the database
         * * userData == null if it doesn't find a user with that email in the database 
         */
        const userData = (await collections.user?.findOne({ email : req.body.email}) ) as user; 
        //console.log(userData["pwd"]);
        const validPawd = await bcrypt.compare(req.body.pwd , userData["pwd"])  
    

      if ( userData == null ) {// if the new user is not already in the DB clog him it

        res.status(500).send("that account doen't exist , try other credencial or create an account");
      
        }else if(validPawd) {

            const token = jwt.sign({_id : userData["_id"]}, SECRET)
            res.header('auth-token',token).status(201).send(`user  id ${userData["_id"]} name ${userData["userName"]} logged in  `)
    
        }else{
            res.status(401).send("password invalid")
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}