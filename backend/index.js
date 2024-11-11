import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
  cors({
    origin: "https://book-store-mern-stack-delta.vercel.app", // No trailing slash
    methods: "GET, POST, PUT, DELETE",
    credentials: true, // Allow cookies if needed
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true }) // Options for improved connection handling
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
