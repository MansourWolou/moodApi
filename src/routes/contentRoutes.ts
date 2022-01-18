
import express from "express";
import {addContent} from "../controller/contentController/addContent"
import {getPropertie} from "../controller/contentController/getPropertie"
import { getContent } from "../controller/contentController/getContent";
import multer from "multer";

export const contentRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"/home/mansour/mood/moodApi/src/tmp")
    },
    filename: (req,file , cb)=>{
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage:storage,
})

contentRouter.use(express.json())
contentRouter.post("/",upload.single('content'),addContent);//
contentRouter.get("/",getPropertie);
contentRouter.get("/data/:id",getContent);


