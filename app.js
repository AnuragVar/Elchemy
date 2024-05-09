import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import User from "./src/routes/user.route.js";
import Customer from "./src/routes/customer.route.js";
import Communication from "./src/routes/communication.route.js";


app.use("/api/v1/user", User);
app.use("/api/v1/customer", Customer);
app.use("/api/v1/conversation", Communication);

export { app };
