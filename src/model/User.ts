/**
 * @brief
 * In TypeScript, classes or interfaces can be used to create models to represent 
 * what our documents will look like. Classes can define what properties an object should have, 
 * as well as what data type those properties should be. This is like an application-level schema. 
 * Classes also provide the ability to create instances of that class and take advantage of 
 * the benefits of object-orientated programming.
 */
 import BSON from "bson";
import * as mongoDB from "mongodb";
export class User extends Document {
    private userName : string; // MIN et max de carract
    private password : string; // MIN et max de carract
    private email : string; // verifier si c bon
    private createAt : Date; // *?
    private updateAt : Date; // *?

    constructor(name : string , pwd : string , mail : string ){
        super();
       // assert()
        this.userName = name;
        this.password = pwd;
        this.email = mail;
        this.createAt = new Date();
        this.updateAt = new Date();
    }
}
export interface Document {
    [key: string]: any;
  }
export interface user extends Document{
    
}