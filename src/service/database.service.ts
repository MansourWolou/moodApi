/**
 * @brief Now we need to create our service that will talk to the database. 
 * This class will be responsible for configuring the connection.
 */
// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
//We want to access our collection from outside our service,

export const collections: { user?: mongoDB.Collection } = {}
// Initialize Connection

export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb+srv://Mansour:wCC8TQQuHs19qHmG@cluster0.kzxle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            
    await client.connect();
        
    const db: mongoDB.Db = client.db("memedb");
   
    const userCollection: mongoDB.Collection = db.collection("user");
 
  collections.user = userCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
 }