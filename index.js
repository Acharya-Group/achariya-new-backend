import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import routes from "./routes/index.js";
import morgan from 'morgan'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8006;

app.use(cors({
  origin: [
    "https://achariyagroup.in",
    "http://localhost:3000",
    "https://achariya-new-frontend.vercel.app"
  ],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://achariya-new-frontend.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

// ✅ API routes
app.use("/api/v1", routes);

// ✅ Connect database
ConnectDb();

// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
