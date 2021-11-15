// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../service/database.service";
import {User} from "../model/User";
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());
// GET

userRouter.get("/e", async (_req: Request, res: Response) => {
    try {
        // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as Game array to take advantage of types
        const users = (await collections.user?.find({}).toArray()) as User[];

        res.status(200).send(users);
    } catch (error ) {
        console.log("lol")
        res.status(500).send(error);
    }
});
// Example route: http://localhost:8080/games/610aaf458025d42e7ca9fcd0
userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        // _id in MongoDB is an objectID type so we need to find our specific document by querying
        const query = { _id: new ObjectId(id) };
        const game = (await collections.user?.findOne(query)) as User;

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame = req.body as User;
        const result = await collections.user?.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
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