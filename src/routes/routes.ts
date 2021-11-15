import { Express, Request, Response } from "express";
import {authentication , authorization} from "../auth"
import * as mongoDB from "mongodb";
import { User } from "../model/User";

/**
 * register user
 * 
 * login
 * 
 * get user session
 * 
 * logout
 * 
 * get random content
 * 
 * liste user like
 * 
 * render user data
 * 
 * download the content
 * 
 * share the link of a content
 * 
 * add a content 
 * 
 * delete a content
 */
export default function  ( app : Express ){
    app.post('/api/v1/signup',(req: Request, res: Response) => {
        let  user : User = new User(req.body.name , req.body.pwd , req.body.mail);
        
      //if (user.validation(user.dbCall(req,database)) === true) {
       //   console.log("ok")
      //}
    });

    app.post('/api/v1/login', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });
    //log out
    app.delete('/api/v1/session', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });
    //log in
    app.get('/api/v1/session', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.get('/api/v1/randomcontent', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.get('/api/v1/userLike', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.get('/api/v1/user', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.get('/api/v1/downloadContent', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.get('/api/v1/contentLink', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.post('/api/v1/{userId}/content', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.put('/api/v1/{userId}/content', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.delete('/api/v1/{userId}/content', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

    app.get('/', (req: Request, res: Response) => {
        res.send("TypeScript Wiht Expresss");
    });

}