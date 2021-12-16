import { ObjectId } from "bson";
import * as mongodb from "mongodb";

export interface Document {
    [key: string]: any;
  }
export interface user extends Document{
  _id? : mongodb.ObjectId;
  schemaVersion:number;
  name: String;
  pwd:string;
  email : string;
  createAt? : Date; // *?
  updateAt? : Date; // *?

}
export interface properties extends Document{
  _id? : mongodb.ObjectId;
  schemaVersion:number;
  tag : string[];
  duration? : number;
  rank? : number;
  autorId : mongodb.ObjectId;
  contentId : mongodb.ObjectId;
}
export interface data {
  dataId?: ObjectId;
  content: mongodb.Binary;
}
export interface content extends Document{
  _id : mongodb.ObjectId;
  schemaVersion:number;
  dataMap : data;
}

/**
 *     getRandomContent():void{}
    getContent():void{}
    searchOnly():void{}
    downloadConten():void{}
    shareContentLink():void{}
    getUser():void{}
 */