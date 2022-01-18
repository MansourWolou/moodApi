// External Dependencies

import * as mongodb from "mongodb";
import express, { Request, Response } from "express";
import {content, properties, user } from "../../model/model"
import { collections } from "../../service/database.service";
import * as fs from 'fs';
import * as path from 'path';

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())


export async function addContent(req : Request , res : Response){
    const fileName = req.file?.filename;
    const theFile = Buffer.from(__dirname+"/src/tmp/"+fileName)
    //console.log(req.files);
    console.log(theFile);
    const newContent: content={
        _id: new mongodb.ObjectId,
        schemaVersion: 1,
        dataMap: {
            content: new mongodb.Binary(theFile)
        }
    };
    console.log(req.file);
    const newProperties : properties = {
        schemaVersion: 1,
        tag: req.body.tag,
        autorId: req.body.autorId,
        contentId: newContent._id
    };
    try {
        await collections.content?.insertOne(newContent);
        await collections.properties?.insertOne(newProperties);
        res.status(200).send("new content add")
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
    
}