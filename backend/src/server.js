import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoutes from "./routes/transactionRouter.js";
import job from "./config/cron.js";

dotenv.config();

if(process.env.NODE_ENV === "production") job.start();

const port = process.env.PORT;

const app = express();


app.use(rateLimiter);
app.use(express.json());


app.get("/api/health",(req,res) => {
    res.status(200).json({status:"ok"});
});

app.use("/api/transactions",transactionRoutes)


initDB().then(()=>{
    app.listen(port,()=>{
        console.log("Server is up and running at port 5001")
    });
})

