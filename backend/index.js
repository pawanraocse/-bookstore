import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
//app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  return response.status(200).send("Hello World!!");
});

app.use("/books", booksRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`app listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
