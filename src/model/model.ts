export interface Document {
    [key: string]: any;
  }
export interface user extends Document{
    name: String;
    pwd:string;
    eamil : string;
    createAt? : Date; // *?
    updateAt? : Date; // *?
}