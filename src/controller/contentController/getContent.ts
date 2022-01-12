
import { ObjectId } from "bson";
import * as mongodb from "mongodb";
import express, { Request, Response } from "express";
import {content, properties, user } from "../../model/model"
import { collections } from "../../service/database.service";

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())

export async function getContent(req:Request, res:Response){
    let search = req.body.search;
    try {
        const findSearch =  collections.properties?.find(search) 
        if (findSearch === null) {
            res.status(404).send("did'nt find")
        }else{
            //TODO: return the search result
            res.status(200).send(findSearch?.toArray())
        }
    } catch (error) {
        
    }
}