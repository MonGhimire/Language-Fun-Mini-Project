import express  from "express";
import cors from "cors";


const app = express()
app.use(express.json())
app.use(cors())


// endpoint




const port = process.env.PORT || 6000
app.listen(port,()=>{
    console.log("running at: http://localhost:" + port);
})