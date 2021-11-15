import { Express, Request, Response } from "express";
import { User } from "./model/User";


export  function authentication(body : object){

    //let  user : User = new User(body.name , body.pwd , body.mail);
    //console.log(user.getUser());
    /*if ( (await user.validation(req, db)).valueOf() ===  true ) {
        db.postDbRequest("insertOne","user",user.getUser());
    }*/
    // mongodb.db.collection(coll).insertOne(user.postUser()).

}
export function authorization(){

}