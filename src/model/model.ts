import { ObjectId } from "bson";

export interface Document {
    [key: string]: any;
  }
export interface user extends Document{
  _id? : ObjectId;
  schemaVersion:number;
  name: String;
  pwd:string;
  email : string;
  createAt? : Date; // *?
  updateAt? : Date; // *?

}
export interface properties extends Document{
  _id? : ObjectId;
  schemaVersion:number;
  tag : string[];
  rank : number;
  autorId : ObjectId;
  contentId : ObjectId;
}
export interface contentObj {
  contentId : ObjectId
  theContent : Blob
}
export interface content extends Document{
  _id? : ObjectId;
  schemaVersion:number;
  content : contentObj[];
  rank : number;
  autorId : ObjectId;
  contentId : ObjectId;
}
/**
 *     getRandomContent():void{}
    getContent():void{}
    searchOnly():void{}
    downloadConten():void{}
    shareContentLink():void{}
    getUser():void{}
 */