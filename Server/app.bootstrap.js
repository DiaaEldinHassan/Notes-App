import express from "express";
import cors from "cors";
import "./Config/env.watcher.js";
import { dbConnect } from "./Src/DB/db.connection.js";
import { serverPort } from "./Config/config.service.js";
import { globalErrorHandler, auth, notes, authorization, user } from "./Src/index.js";
export async function bootstrap() {
  const app = express();
  // File Parsing
  app.use(express.json());
  app.use(cors({origin:["http://localhost:5173"],credentials:true}))
  // DB Connect
  await dbConnect();
  // Routing
  app.use("/auth", auth);
  app.use("/notes", authorization, notes);
  app.use("/users",authorization,user);
  // Middlewares
  app.use(globalErrorHandler);
  // App listen
  app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort} 🚀🚀`);
  });
}
