const express = require("express");
const app = express();
const cors = require("cors");
const port = 9000;
const dv = require("./Config/mongoose");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/',require('./Routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
})