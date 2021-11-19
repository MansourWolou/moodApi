// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {user , Document} from "../model/model"
import { collections } from "../service/database.service";
import {User} from "../model/User";
import * as bcrypt from "bcrypt";
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());
// GET

userRouter.get("/", async (_req: Request, res: Response) => {
    try {
        // Call find with an empty filter object, meaning it returns all documents in the collection. 
        //Saves as Game array to take advantage of types
        const users = (await collections.user?.find({}).toArray()) as user[];
        res.status(200).send(users);
    } catch (error ) {
        res.status(500).send(error);
    }
});
// Example route: http://localhost:8080/games/610aaf458025d42e7ca9fcd0
userRouter.get("/:id", async (req: Request, res: Response) => {
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
});
// POST
/**
 * i can create a new user without having to save the pwd , 
 * i can create a user who is not already in the database
 * if the user is already in the database it throw a strange error*
 * that i don't understand but anyway i works
 */
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.pwd, salt)
        const newUser : user = {
            name: req.body.name,
            pwd: hashedPassword,
            eamil: req.body.email
        }
        //const newUser = new User(req.body.name,hashedPassword,req.body.email);
        let result : any;
        /**
         * * check if the user already exist by cheking the email in the database
         */
       // let userMail = newUser.getEmail(); 
       let userType : user
       let documentType : Document
      (await collections.user?.findOne({ email : req.body.email}).then((val)=>{
            if (val === document) {
                console.log(val.eamil)
            }
        }) )  ; //find the best way to make sure that the type is Document befor converting it to user
        /*function isDocument(test: any): test is Document{
            return typeof test === new Document();
        }*/
    

      
        //const newUserMail =  as User; 
        //const mail = on.getEmail();
        if ( req.body.email != "") {// if the new user is not already in the DB create it
            result = await collections.user?.insertOne(newUser);
        }
        result
            ? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});
// PUT
userRouter.put("/:id", async (req: Request, res: Response) => {
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
});
// DELETE
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.user?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});