// External Dependencies

import { ObjectId } from "bson";
import * as mongodb from "mongodb";
import express, { Request, Response } from "express";
import {content, properties, user } from "../../model/model"
import { collections } from "../../service/database.service";
import { buffer } from "stream/consumers";
import fs from 'fs-extra';

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())

export async function addContentTest(res : Response){
    //const buffer : Buffer;//fs.readFile('../../Vidéos/yoyo.mp4' , function(){})
   
    
}