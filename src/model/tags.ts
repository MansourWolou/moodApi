import { Map } from "bson";

export type data = {
    content: BinaryData;
    meta : string;
    id : number;
}

export class Tags{
    private  tagsMap : any; 
    constructor(){
        this.tagsMap = new Map <string,Array<data>>();
    }
    getRandomContent():void{}
    getContent():void{}
    searchOnly():void{}
    downloadConten():void{}
    shareContentLink():void{}
    getUser():void{}
}
