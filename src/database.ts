import * as dotenv from "dotenv";
import { query } from "express";
import * as mongoDB from "mongodb";
export class Database {
  private URI: string;
  //private db : mongoDB.Db;
  constructor() {
    dotenv.config();
    this.URI =
      "mongodb+srv://Mansour:wCC8TQQuHs19qHmG@cluster0.kzxle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  }
  async connectToDatabase() {
    // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();
    // Create a new MongoDB client with the connection string from .env
    const client = new mongoDB.MongoClient(this.URI);
    // Connect to the database with the name specified in .env
    const db = client.db(process.env.DB_NAME);

    try {
      // Connect to the cluster
      await client.connect();
      console.log("Successfully connected to database");
    } catch (error) {
      console.error(error);
    }

    /*
        // Connect to the collection with the specific name from .env, found in the database previously specified
        const gamesCollection: mongoDB.Collection = db.collection(TAGS_COLLECTION_NAME);
    
        // Persist the connection to the Games collection
        collections.games = gamesCollection;
    
        console.log(
            `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`,
        );*/
  }
  async disconnectOfDatabase() {
    const client = new mongoDB.MongoClient(this.URI);

    try {
      // disconnect of the cluster
      await client.close();
      console.log("Successfully disconnected of database");
    } catch (error) {
      console.error(error);
    }
  }

    insert(collection: string, query: object): string {
    return "";
}
    insertOne(collection: string, query: object): string {
    return "";
}
    insertMany(collection: string , query : object):string{
    return "";
}
    find(Collection: string , query : object):string{
    return "";
}
    findOne(Collection: string , query : object):string{
    return "";
}
    updateOne(Collection: string , query : object):string{
    return "";
}
    updateMany(Collection: string , query : object):string{
    return "";
}
    deleteOne(Collection: string , query : object):string{
    return "";
}
    deleteMany(Collection: string , query : object):string{
    return "";
}
}
