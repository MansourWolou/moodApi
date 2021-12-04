// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {user , Document} from "../../model/model"
import { collections } from "../../service/database.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());

export async function logginUser (req: Request, res: Response)  {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.pwd, salt)
        const userlogging : user = {
            name: req.body.name,
            pwd: hashedPassword,
            email: req.body.email,
            schemaVersion: 1
        }
        //const newUser = new User(req.body.name,hashedPassword,req.body.email);
        let result : any;
        /**
         * * check if the user already exist by cheking the email in the database
         */
      const userData = (await collections.user?.findOne({ email : req.body.email}) ) as user; //find the best way to make sure that the type is Document befor converting it to user
     
      const validPawd = await bcrypt.compare(req.body.pwd , userData["password"])  
      
      if ( (req.body.email == userData["email"]) && validPawd) {// if the new user is not already in the DB clog him it
        
     //!TOKEN SECRET TO HIDE :DGD68*Q6$+l5ll9jk4hgg.
     //TODO: create a better secret 
            const token = jwt.sign({_id : userData["_id"]}, "DGD68*Q6$+l5ll9jk4hgg.")
            res.header('auth-token',token).status(201).send(`Successfully  user with id ${userData["_id"]} name ${userData["userName"]} `)
            
        }else {
            res.status(500).send("email or password is wrong ");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
}