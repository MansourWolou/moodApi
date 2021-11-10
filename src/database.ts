/**
 * @brief this document difine the class database. This class
 * will do CRUD operations on the database. It will be instanciated in all of
 * the class in ./src/service.
 **inkOfMongoDBdoc https://www.mongodb.com/developer/quickstart/node-crud-tutorial/
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
  /**
   * @brief insert a single document into the collecton.
   * @param collecton 
   * @param query : the document to put in the collecton
   * @returns 
   * !USE DOTENV TO REMPLACE "Mansour" value
   * ?how to make sure that it is inserted
   * ?is it a good idea to use a class test
   */
  async insertOne(collecton: string, query: object): Promise<void> {
    try {
      await this.client.collecton(collecton).insertOne(query)
    } catch (error) {
      console.error(error);
    }
}
/**
 * @brief will insert an array of documents into your collecton
 ** One important option to note for insertMany() is ordered. 
 ** If ordered is set to true, the documents will be inserted in the order given in the array. 
 ** If any of the inserts fail (for example, if you attempt to insert a document with an _id that
 **  is already being used by another document in the collecton), the remaining documents will not be inserted.
 **  If ordered is set to false, the documents may not be inserted in the order given in the array. 
 ** MongoDB will attempt to insert all of the documents in the given array—regardless of whether any of the other inserts fail. 
 ** By default, ordered is set to true.
 * @param collecton 
 * @param query 
 * @returns 
 * Just like the MongoDB Driver automatically created the _id field for us when we called insertOne(), 
 * the Driver has once again created the _id field for us when we called insertMany().
 * ?how to make sure that it is inserted
 * ?is it a good idea to use a class test
 */
  async insertMany(collecton: string , query : object): Promise<void>{
    try {
      await this.client.collecton(collecton).insertMany(query)
    } catch (error) {
      console.error(error)
    }
}
/**
 * @brief you can include zero to many properties in the query object.
 ** you can  query for multiple documents at a time
 * @param collecton 
 * @param query 
 * ?do I need to check if the find request get something 
 */
  async find(collecton: string , query : object):Promise<object>{
      try {
        return await  this.client.collecton(collecton).find(query)
      } catch (error) {
        console.error(error)
        return {error};
      }
  }
  /**
 * @brief you can include zero to many properties in the query object.
 ** you can  query for multiple documents at a time and sort them
 * @param collecton 
 * @param query 
 * @param sort
 * eg:
 * const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find(
                        {
                            bedrooms: { $gte: minimumNumberOfBedrooms },
                            bathrooms: { $gte: minimumNumberOfBathrooms }
                        }
                    ).sort({ last_review: -1 });
 */
  async findAndSort(collecton: string , query : object,sort : object):Promise<object>{
    try {
      return await this.client.collecton(collecton).find(query).sort(sort)
    } catch (error) {
      console.error(error)
      return {error};
    }
}
/**
 * @brief you can include zero to many properties in the query object.
 ** you can  query for multiple documents at a time and set the limit for the cursor
 * @param collecton 
 * @param query 
 * @param limit
 */
  async findAndLimit(collecton: string , query : object,limit : object): Promise<object>{
    try {
      return await this.client.collecton(collecton).find(query).limit(limit)
    } catch (error) {
      console.error(error)
      return {error};
    }
}
/**
 * @brief you can include zero to many properties in the query object.
 ** you can  query for multiple documents at a time and set the limit for the cursor and sort them
 * @param collecton 
 * @param query 
 * @param limit
 * @param sort
 * eg:
 * async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find(
                            {
                                bedrooms: { $gte: minimumNumberOfBedrooms },
                                bathrooms: { $gte: minimumNumberOfBathrooms }
                            }
                            ).sort({ last_review: -1 })
                            .limit(maximumNumberOfResults);

    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}
 */
  async findAndSortAndLimit(collecton: string , query : object,limit : object, sort:object): Promise<object>{
  try {
    return await this.client.collecton(collecton).find(query).sort(sort).limit(limit)
  } catch (error) {
    console.error(error)
    return {error};
  }
}
/**
 * @brief will return the first document that matches the given query. 
 ** Even if more than one document matches the query, only one document will be returned.
 * @param collecton 
 * @param query 
 */
  async findOne(collecton: string , query : object): Promise<void>{
  try {
    await this.client.collecton(collecton).findOne(query)
  } catch (error) {
    console.error(error)
  }
}
/**
 * @brief updateOne() will update the first document that matches the given query.
 ** Even if more than one document matches the query, only one document will be updated.
 * @param collecton 
 * @param query 
 * @parom filter 
 ** the Filter used to select the document to update. 
 ** You can think of the filter as essentially the same as the query param we used in findOne() 
 ** to search for a particular document. You can include zero properties in the filter to search 
 ** for all documents in the collection, or you can include one or more properties to narrow your search.
 * @param update 
 ** the update operations to be applied to the document. 
 ** MongoDB has a variety of update operators you can use such as $inc,
 **  $currentDate, $set, and $unset among others. See the official documentation for a complete 
 ** list of update operators and their descriptions.
 ** When we use $set, we pass a document that contains fields and values that should be 
 ** updated or created. The document that we pass to $set will not replace the existing document;
 **  any fields that are part of the original document but not part of the document we pass 
 ** to $set will remain as they are.
 */
  async updateOne(collecton: string , query : object,filter :object,update:object): Promise<void>{
    try {
      await this.client.collection(collecton).updateOne(filter,update)
    } catch (error) {
      console.error(error)
  }
}
/**
 * @brief Upsert is a handy feature that allows you to update a document 
 * if it exists or insert a document if it does not.
 * @param collecton 
 * @param query 
 * @parom filter 
 ** the Filter used to select the document to update. 
 ** You can think of the filter as essentially the same as the query param we used in findOne() 
 ** to search for a particular document. You can include zero properties in the filter to search 
 ** for all documents in the collection, or you can include one or more properties to narrow your search.
 * @param update 
 ** the update operations to be applied to the document. 
 ** MongoDB has a variety of update operators you can use such as $inc,
 **  $currentDate, $set, and $unset among others. See the official documentation for a complete 
 ** list of update operators and their descriptions.
 ** When we use $set, we pass a document that contains fields and values that should be 
 ** updated or created. The document that we pass to $set will not replace the existing document;
 **  any fields that are part of the original document but not part of the document we pass 
 ** to $set will remain as they are.
 ** We'll pass {upsert: true} 
 */
  async updateOneAndUpsert(collecton: string , query : object,filter :object,update:object): Promise<void>{
      try {
        await this.client.collection(collecton).updateOne(filter,update, { upsert: true })
      } catch (error) {
        console.error(error)
    }
  }
/**
 * @brief updateMany() requires that you pass a filter of type object and an update of type object. 
 * You can choose to include options of type object as well.
 * @param collecton 
 * @param query 
 * @parom filter 
 ** the Filter used to select the document to update. 
 ** You can think of the filter as essentially the same as the query param we used in findOne() 
 ** to search for a particular document. You can include zero properties in the filter to search 
 ** for all documents in the collection, or you can include one or more properties to narrow your search.
 * @param update 
 ** the update operations to be applied to the document. 
 ** MongoDB has a variety of update operators you can use such as $inc,
 **  $currentDate, $set, and $unset among others. See the official documentation for a complete 
 ** list of update operators and their descriptions.
 ** When we use $set, we pass a document that contains fields and values that should be 
 ** updated or created. The document that we pass to $set will not replace the existing document;
 **  any fields that are part of the original document but not part of the document we pass 
 ** to $set will remain as they are.
 * 
 */
  async updateMany(collecton: string , query : object,filter :object,update:object):Promise<void>{
      try {
        await this.client.collection(collecton).updateMany(filter,update)
      } catch (error) {
        
      }
  }
 /**
  * @brief We can delete a single document by calling Collection's deleteOne().
  * deleteOne() will delete the first document that matches the given query. 
  * Even if more than one document matches the query, only one document will be deleted. 
  * If you do not specify a filter, the first document found in natural order will be deleted.
  * @param collecton 
  * @param query 
  */ 
  async deleteOne(collecton: string , query : object):Promise<void>{
      try {
        await this.client.collection(collecton).deleteOne(query)
      } catch (error) {
        console.error(error);
        
      }
  }
/**
 * @brief  requires that you pass a filter of type object. 
 * You can choose to include options of type object as well.
 * @param collecton 
 * @param query 
 * eg
 * async function deleteListingsScrapedBeforeDate(client, date) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews")
        .deleteMany({ "last_scraped": { $lt: date } });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
 */
  async deleteMany(collecton: string , query : object):Promise<void>{
      try {
        await this.client.collection(collecton).deleteMany(query)
      } catch (error) {
        console.error(error);
        
      }
  }
}
