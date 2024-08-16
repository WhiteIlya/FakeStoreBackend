import dotenv from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./router";

dotenv.config();

const app = express();

app.use(
	cors({
		credentials: true,
	})
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
	console.log("Server is running on http://localhost:8080");
});

const url = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(url);
mongoose.connection.on("error", (err) => {
	console.log(err);
});

app.use("/", router());
