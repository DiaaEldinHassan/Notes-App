import express from "express";
import cors from "cors";
import helmet from "helmet";
import "./Config/env.watcher.js";
import { dbConnect } from "./Src/DB/db.connection.js";
import { serverPort } from "./Config/config.service.js";
import { globalErrorHandler, auth, notes, user } from "./Src/index.js";

export async function bootstrap() {
  const app = express();

  // 1️⃣ JSON parser
  app.use(express.json());

  // 2️⃣ Helmet (with Google OAuth popup support)
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
      crossOriginEmbedderPolicy: false,
    })
  );

  // 3️⃣ CORS
  app.use(
    cors({
      origin: "http://localhost:5173", 
      credentials: true,               
    })
  );

  // 4️⃣ Connect to DB
  await dbConnect();

  // 5️⃣ Routes
  app.use("/auth", auth);
  app.use("/notes", notes);
  app.use("/users", user);

  // 6️⃣ Global error handler
  app.use(globalErrorHandler);

  // 7️⃣ Start server
  app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort} 🚀`);
  });
}
