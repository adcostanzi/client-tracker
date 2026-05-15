import express from "express";
import clientRoutes from "./routes/clientRoutes";
import jobRoutes from "./routes/jobRoutes";

const app = express();

// This line allows to read JSON from the request body
app.use(express.json());

// Initial message for app initialization
app.get("/", (req, res) => {
  res.send("Client Tracker API is running...");
});

// Routing endpoints
app.use("/clients", clientRoutes);

app.use("/jobs", jobRoutes);

export default app;
