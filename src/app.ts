import express from "express";
import clientRoutes from "./routes/clientRoutes";
import jobRoutes from "./routes/jobRoutes";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();

// This line allows to read JSON from the request body
app.use(express.json());

// Initial message for app initialization
app.get("/", (req, res) => {
  res.send("Client Tracker API is running...");
});

// Routing endpoints, note the authentication middleware for both
app.use("/clients", authMiddleware, clientRoutes);
app.use("/jobs", authMiddleware, jobRoutes);

export default app;
