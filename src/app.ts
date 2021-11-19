import express = require('express');
import * as mongoDB from "mongodb";
import { connectToDatabase } from "./service/database.service";
import { userRouter } from "./routes/user.routes";

const PORT: number = 8080;
const app = express();


class HttpServer {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  public async onStart(): Promise<void> {
    
    connectToDatabase().then(() => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use("/v1/user",userRouter);
      //TODO :
      //app.use("/v1/Content",contentRouter);
      //app.use("/v1/metaData",metaDataRouter);

      app.listen(this.port, () => {
        console.log("Application running at  http://memeApp:" + this.port);
      });
    }).catch((error : Error) => {
      console.error("Database connection failed", error);
      process.exit();
      });
       //! USE DOTENV TO PROTECT THE API KEY 
  }
}

let server: HttpServer = new HttpServer(PORT)
server.onStart(); 