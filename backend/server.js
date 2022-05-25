import express  from "express";
import cors from "cors";
import apiRouter from "./routes/apiRouter.js";
import dotenv from 'dotenv'
import { connect } from "./lib/database.js";

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
connect()

// endpoint
app.use("/api", apiRouter)




const port = process.env.PORT || 6000
app.listen(port,()=>{
    console.log("running at: http://localhost:" + port);
})