import express from 'express';
import dotenv from "dotenv";
import routes from './routes/routes.js';
import connectDB from './config/db.js';
import rateLimirer from './middlewares/rateLimitter.js';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());

//middleware to use routes
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());

// app.use((req,res,next) =>{
//     console.log(`${req.method} request for '${req.url}'`);
//     next(); 
// })

app.use(rateLimirer)


app.use("/api/notes", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });


}


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});