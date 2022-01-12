// External Dependencies

import express from "express";
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
import { authorization } from "./../controller/verifyToken";
// Global Config

export const userRouter = express.Router();

userRouter.use(express.json());

// GET
userRouter.get("/",authorization, getAllUsers );//*DONE
// Example route: http://localhost:8080/games/610aaf458025d42e7ca9fcd0
userRouter.get("/:id", getUserById);//*DONE

userRouter.post("/", createUserAccount);//*DONE
//login
userRouter.post("/login",logginUser);//*DONE
// PUT
userRouter.put("/:id", userUpdateData);
// DELETE
userRouter.delete("/:id",userDelete);
//get all the content created by him
userRouter.get("",userContents);
// get the content liked by the use 
userRouter.get("/fav",authorization,userFavoritContent);
//post a content on the platform
userRouter.post("",userPostContent);
// delete a content he create on the platform
userRouter.delete("",userDeletContent)
