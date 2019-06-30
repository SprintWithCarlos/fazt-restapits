import express from "express";
import morgan from "morgan";
import helmet from "helmet";

class Server {
  public app = express.application;
  constructor() {
    this.app = express();
    this.config();
    this.app.use(morgan("dev"));
    this.app.use(helmet());
  }
  config() {
    this.app.set("port", process.env.PORT || 3000);
  }
  routes() {}

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server listening on port", this.app.get("port"));
    });
  }
}

const server = new Server();

server.start();
