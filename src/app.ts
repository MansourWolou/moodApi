import express = require('express');
import * as mongoDB from "mongodb";
import { connectToDatabase } from "./service/database.service";
import { userRouter } from "./routes/userRoutes";
import { propertiesRouter } from './routes/propertiesRoutes';
import { contentRouter } from './routes/contentRoutes';
import dotenv from 'dotenv';

dotenv.config();
let  PORT: string ;
if (typeof process.env.PORT === "string") {
  PORT = process.env.PORT;
}

const app = express();

connectToDatabase().then(() => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/v1/properties",propertiesRouter)
  app.use("/v1/content",contentRouter)
  app.use("/v1/user",userRouter);
  app.use("/",(req,res)=>{res.json("ok")});
  //TODO :
  //app.use("/v1/metaData",metaDataRouter);

  app.listen(PORT, () => {
    console.log("Application running at  http://localhost:" + PORT);
  });
}).catch((error : Error) => {
  console.error("Database connection failed", error);
  process.exit();
  }); 
