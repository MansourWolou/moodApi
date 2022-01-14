
import { ObjectId } from "bson";
import * as mongodb from "mongodb";
import express, { Request, Response } from "express";
import {content, properties, user } from "../../model/model"
import { collections } from "../../service/database.service";

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())

export async function getPropertie(req:Request, res:Response){
    let search = req.body.tag;
    

    try {
        //const findSearch =  await collections.properties?.find(search).toArray() 
       const propertieSearch = (await collections.properties?.find({}).toArray()) as properties[]

        console.log(propertieSearch);
        if (propertieSearch === null) {
            res.status(404).send("did'nt find")

        }else{ 
            console.log("ok");

            res.status(200).send(propertieSearch)
        }
    } catch (error) {
        
    }
}