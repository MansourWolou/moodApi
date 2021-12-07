import * as jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response} from "express";

dotenv.config();
let  SECRET: string ;
if (typeof process.env.SECRET === "string") {
    SECRET = process.env.SECRET;
}

export function authorization (req : Request , res : Response, next: NextFunction  ) : any {

    const token = req.header('auth-token');
    let verified:any;

    if (!token) {

        return res.status(401).send('Access denied')

    }
    try {

        verified = jwt.verify(token ,SECRET )
        req.body = verified//! NOT SURE ABOUT THAT
        console.log(verified);
        
        next();
    } catch (err) {
        res.status(400).send('invalid token')
    }
  
}