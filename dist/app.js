"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const app = (0, express_1.default)();
// This line allows to read JSON from the request body
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Client Tracker API is running...");
});
app.use("/clients", clientRoutes_1.default);
app.use("/jobs", jobRoutes_1.default);
exports.default = app;
