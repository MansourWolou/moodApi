import { ObjectId } from "bson";

export interface Document {
    [key: string]: any;
  }
export interface user extends Document{
    _id? : ObjectId;
    name: String;
    pwd:string;
    eamil : string;
    createAt? : Date; // *?
    updateAt? : Date; // *?
}