
import { ObjectId } from "bson";
import * as mongodb from "mongodb";
import express, { Request, Response } from "express";
import {content, properties, user } from "../../model/model"
import { collections } from "../../service/database.service";

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())

export async function getContent(req:Request, res:Response){
    let contentId = req?.params?.id;
    console.log(contentId)

    try {
        //const findSearch =  await collections.properties?.find(search).toArray() 
       const contentIdSearch =  await collections.content?.findOne(new ObjectId(contentId))

        console.log(contentIdSearch);
        if (contentIdSearch === null) {
            res.status(404).send("did'nt find")

        }else{ 
            console.log("ok");

            res.status(200).send(contentIdSearch)
        }
    } catch (error) {
        
    }
}