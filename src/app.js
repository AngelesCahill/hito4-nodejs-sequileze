import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js"; 
import { verifyToken } from "./controllers/auth.controller.js"; 

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes); 

export default app;