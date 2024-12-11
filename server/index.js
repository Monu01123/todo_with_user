import express from "express";
import cors from "express";
import connectDB from "./db.js";
import user from "./routes/user.route.js";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(express.json());
connectDB();
app.use("/", user);

const PORT = 8080 || process.env.PORT;
app.listen(PORT, async () => {
  console.log(`server running PORT ${PORT}`);
});
