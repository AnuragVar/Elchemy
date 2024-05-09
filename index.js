import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8080;
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERRR: ", error);
      throw new Error();
    });
    app.listen(port,console.log(`Server is running at ${port} port`));
  })
  .catch((err) => {
    console.log("MONGO DB connection failed ", err);
  });
