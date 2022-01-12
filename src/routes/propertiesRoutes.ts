import express from "express";
import {addContent} from "../controller/contentController/addContent"
import {getContent} from "../controller/contentController/getContent"

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())



