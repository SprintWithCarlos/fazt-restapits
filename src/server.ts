import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

class Server {
  public app = express.application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  config() {
    const MONGO_URI = "mongodb://localhost:27017/restapits";
    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })
      .then(db => console.log("DB is connected"))
      .catch(error => console.log(error));
    //Settings
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }
  routes() {
    this.app.use(indexRoutes);
    this.app.use("/api/posts", postRoutes);
    this.app.use("/api/users/", userRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server listening on port", this.app.get("port"));
    });
  }
}

const server = new Server();

server.start();
