/**
 * @brief this document difine the class database. This class
 * will do CRUD operations on the database. It will be instanciated in all of
 * the class in ./src/service.
 */
import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";
export class Database {
  private URI: string;
  private client : any;
  //private db : mongoDB.Db;
  constructor() {
    dotenv.config();
    //! USE DOTENV TO PROTECT THE API KEY
    this.URI =
      "mongodb+srv://Mansour:wCC8TQQuHs19qHmG@cluster0.kzxle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        // Create a new MongoDB client with the connection string from .env
      this.client = new mongoDB.MongoClient(this.URI);
    }
    async connectToDatabase() {
    // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();

    try {
      // Connect to the cluster
      await this.client.connect();
      console.log("Successfully connected to database");
    } catch (error) {
      console.error(error);//TODO: Use Class test
    }
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
  /**
   * @brief insert a single document into the collection.
   * @param collection 
   * @param query : the document to put in the collection
   * @returns 
   * !USE DOTENV TO REMPLACE "Mansour" value
   */
  async insertOne(collection: string, query: object): Promise<void> {
    try {
      await this.client.collection(collection).insertOne(query)
    } catch (error) {
      console.error(error);
    }
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
