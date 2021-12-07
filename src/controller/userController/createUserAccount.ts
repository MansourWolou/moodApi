// External Dependencies

import express, { Request, Response } from "express";
import {user , Document} from "../../model/model"
import { collections } from "../../service/database.service";
import * as bcrypt from "bcrypt";
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());

/**
 * @brief adding a new user to the collection if it not already exist
 * @param req 
 * @param res 
 */
export async  function createUserAccount (req: Request, res: Response) {
    try {
        const salt = await bcrypt.genSalt(10);//* 10 is the complexity of the string generated
        const hashedPassword = await bcrypt.hash(req.body.pwd, salt)//* the hash is create and only bcryt can decrypt it
        const newUser : user = {
            name: req.body.name,
            pwd: hashedPassword,
            email: req.body.email,//TODO: je n'ai pas encore vérifier si cette adresse mail existe
            schemaVersion: 1
        }
        let result : any;
        /**
         * * check if the user already exist  in the database
         * ! there is only one email per account. If a user try to create a new account with an old one that
         * ! is stored in the database ; it will fail
         */
      const userData = (await collections.user?.findOne({ email : req.body.email}) ) as user; 
       // userData == null if it doesn't find a user with that email in the database 
       
      if ( userData == null) {// if the new user is not already in the DB create it
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