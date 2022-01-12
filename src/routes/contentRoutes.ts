
import express from "express";
import {addContent} from "../controller/contentController/addContent"
import {getContent} from "../controller/contentController/getContent"
import {addContentTest} from "../controller/contentController/addContentTest"
export const contentRouter = express.Router();
import multer from "multer";
import assert from "assert";

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"/home/mansour/mood/moodApi/src/public/uploads")
    },
    filename: (req,file , cb)=>{
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage:storage,
    
})
//assert.strictEqual(upload.constructor.name, 'Multer');

contentRouter.use(express.json())
contentRouter.post("/",upload.single('content'),addContent);
contentRouter.post("/test",addContentTest);
contentRouter.get("/",getContent);


