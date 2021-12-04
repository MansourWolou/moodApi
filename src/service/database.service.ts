/**
 * @brief Now we need to create our service that will talk to the database. 
 * This class will be responsible for configuring the connection.
 */
// External Dependencies
import * as mongoDB from "mongodb";
import dotenv from 'dotenv';
let dbName : string;
let dbConn : string;
dotenv.config();
if (typeof process.env.DB_CONN === "string" &&
    typeof process.env.DB_NAME === "string") {
      dbConn = process.env.DB_CONN;
      dbName = process.env.DB_NAME;
  
}
// Global Variables
//We want to access our collection from outside our service,

export const collections: { user?: mongoDB.Collection ,
                            properties?:mongoDB.Collection ,
                            content? : mongoDB.Collection
                          } = {}
// Initialize Connection

export async function connectToDatabase () {
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbConn);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db("memedb");
      /**
       **the validation is done on compass but it still don't work
       */
      // Apply schema validation to the  user collection
      await applyUserSchemaValidation(db);
   
    const userCollection: mongoDB.Collection = db.collection("user");
    const propertiesCollecton : mongoDB.Collection = db.collection("properties");
    const contentCollection : mongoDB.Collection = db.collection("content")
 
  collections.user = userCollection;
  collections.properties = propertiesCollecton;
  collections.content = contentCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName} , ${propertiesCollecton.collectionName} , ${contentCollection.collectionName} `);
 }

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Game model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applyUserSchemaValidation(db: mongoDB.Db) {

const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "pwd", "email","schemaVersion"],
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
      },
      schemaVersion: {
        bsonType: "int",
        description: "the actuel version of the schema"
      }
      }
  }
}
    // Try applying the modification to the collection, if the collection doesn't exist, create it 
    //!USER DOTENV 
    await db.command({
      collMod: "user",
      validator: jsonSchema
  }).catch(async (error: mongoDB.MongoServerError) => {
      if(error.codeName === 'NamespaceNotFound') {
          await db.createCollection('user', {validator: jsonSchema});
      }
  });
}
