const db = require ("./db.json");
const cors = require("cors");
const express = require ("express");
const app = express();

app.use(express.json())  //automatically converts to json

app.use(cors());

app.get('/api/candidates' ,(req,res)=>{
    return res.send(db).status(200);
})


app.get('/*',(req,res)=>{
    return res.json("URL not found").status(404);
})


app.listen(3000 , ()=>{
    console.log(`Server is running on port 3000`);
});