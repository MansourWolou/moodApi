// External Dependencies

import { ObjectId } from "bson";
import express, { Request, Response } from "express";
import {content, properties, user } from "../../model/model"
import { collections } from "../../service/database.service";

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())

export function addContent(req : Request , res : Response){
    console.log(req);
    const newContent: content={
        _id: new ObjectId(),
        schemaVersion: 1,
        dataMap: {
            content: req.body.content
        }
    };
    const newProperties : properties = {
        schemaVersion: 1,
        tag: req.body.tag,
        autorId: new ObjectId,
        contentId: newContent._id
    };
    console.log(req.body);
    res.status(200)
    
}