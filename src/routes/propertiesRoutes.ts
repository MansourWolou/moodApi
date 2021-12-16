import express from "express";
import {addContent} from "./../controller/propertiesController/addContent"

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())

propertiesRouter.post("/",addContent);


