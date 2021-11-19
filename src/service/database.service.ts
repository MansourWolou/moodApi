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
      /**
       **the validation is done on compass but it still don't work
       */
      // Apply schema validation to the  user collection
      //await applyUserSchemaValidation(db);
   
    const userCollection: mongoDB.Collection = db.collection("user");
 
  collections.user = userCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
 }

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Game model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applyUserSchemaValidation(db: mongoDB.Db) {

  await db.command({
    "collMod": "user",
    "validator": {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "pwd", "email"],
            additionalProperties: true,
            properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required and is a string"
            },
            pwd: {
                bsonType: "string",
                description: "'pwd' is required and is a string"
            },
            email: {
                bsonType: "string",
                description: "'email' is required and is a string"
            }
            }
        }
     }
});
}