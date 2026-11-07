// Write your code here
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5175",
];

// Allow our React frontend to talk to this backend
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Convert incoming JSON requests to JavaScript objects
app.use(express.json());

// Mount all API routes under /api
app.use("/api", routes);
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});
// Handle errors
app.use(notFoundHandler);
app.use(errorHandler);

export default app;