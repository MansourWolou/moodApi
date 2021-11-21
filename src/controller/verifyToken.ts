import * as jwt from "jsonwebtoken"
import express, { Request, Response } from "express";

export function authorization (req : Request , res : Response, next :string ) : any {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access denied')
    }
    try {
        //!TOKEN SECRET TO HIDE :DGD68*Q6$+l5ll9jk4hgg.
        const verified = jwt.verify(token ,"DGD68*Q6$+l5ll9jk4hgg." )
        //req = verified; 
    } catch (err) {
        res.status(400).send('invalid token')
    }
}