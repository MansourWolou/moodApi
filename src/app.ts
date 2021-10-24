import express = require('express');
import bodyParser = require('body-parser');
import {  Database } from './database';
import { Tags } from './service/tags';
import { user } from './service/user';
import { metaData } from './service/metaData';
const PORT: number = 8080;
const app = express();


class HttpServer {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  public onStart(): void {
    
    //app.use(bodyParser.json());
    //app.use(bodyParser.urlencoded({ extended: true }));
    //app.use(express.static(PUBLIC_DIR));
    let dataB : Database = new Database();
    let onTagCollection : Tags = new Tags();
    let onUserCollection: user = new user();
    let onMetaDataCollection:metaData = new metaData();

    dataB.connectToDatabase();
    
    app.listen(this.port, () => {
      console.log("Application running at  http://localhost:" + this.port);
    });
  }
}

let server: HttpServer = new HttpServer(PORT)
server.onStart();