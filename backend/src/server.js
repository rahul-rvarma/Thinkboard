import express from 'express';
import dotenv from "dotenv";
import routes from './routes/routes.js';
import connectDB from './config/db.js';
import rateLimirer from './middlewares/rateLimitter.js';

dotenv.config();

const app = express();
app.use(express.json());

//middleware to use routes

app.use(express.json());

// app.use((req,res,next) =>{
//     console.log(`${req.method} request for '${req.url}'`);
//     next(); 
// })

app.use(rateLimirer)

app.use("/api/notes", routes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("Server is running on port 5001");
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});