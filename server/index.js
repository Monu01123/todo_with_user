import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import user from "./routes/user.route.js";

import todo from './routes/todo.route.js';

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://your-production-domain.com"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);  // Allow the request
    } else {
      callback(new Error("Not allowed by CORS"), false);  // Reject the request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));


app.use(express.json());
connectDB();
app.use("/", user);
app.use("/",todo);

const PORT = 8080 || process.env.PORT;
app.listen(PORT, async () => {
  console.log(`server running PORT ${PORT}`);
});
