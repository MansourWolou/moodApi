// External Dependencies

import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {user , Document} from "../model/model"
import { collections } from "../service/database.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
import {getAllUsers} from "../controller/userController/getAllUsers"
import {getUserById} from "../controller/userController/getUserById"
import {createUserAccount} from "../controller/userController/createUserAccount"
import {logginUser} from "../controller/userController/logginUser"
import {userUpdateData} from "../controller/userController/userUpdateData"
import { userDelete } from "../controller/userController/userDelete";
import { userContents } from "../controller/userController/userContents";
import { userDeletContent } from "../controller/userController/userDeletContent";
import { userFavoritContent } from "../controller/userController/userFavoritContent";
import { userPostContent } from "../controller/userController/userPostContent";
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());

// GET
userRouter.get("/", getAllUsers );
// Example route: http://localhost:8080/games/610aaf458025d42e7ca9fcd0
userRouter.get("/:id", getUserById);
// POST
/**
 * i can create a new user without having to save the pwd , 
 * i can create a user who is not already in the database
 * if the user is already in the database it throw a strange error*
 * that i don't understand but anyway i works
 */
userRouter.post("/", createUserAccount);
//login
userRouter.post("/login",logginUser);
// PUT
userRouter.put("/:id", userUpdateData);
// DELETE
userRouter.delete("/:id",userDelete);
//get all the content created by him
userRouter.get("",userContents);
// get the content liked by the use 
userRouter.get("",userFavoritContent);
//post a content on the platform
userRouter.post("",userPostContent);
// delete a content he create on the platform
userRouter.delete("",userDeletContent)
