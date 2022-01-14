import express from "express";
import {addContent} from "../controller/contentController/addContent"
import {getPropertie} from "../controller/contentController/getPropertie"

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json())



