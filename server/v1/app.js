import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rotas
import userRoutes from "./routes/user-routes.js";
import authRoutes from "./routes/auth-routes.js";
import ticketRoutes from "./routes/ticket-routes.js";
import ratingRoutes from "./routes/rating-routes.js";

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/ratings", ratingRoutes);

export default app;
