const express = require("express");
const mongoose =require("mongoose");
const bodyParser =require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require ('dotenv').config();

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
//console.log("Mongo URI", MONGODB_URI_PROD); 

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI).then(()=> console.log('mongoose connected'))
.catch((err)=> console.log("DB connection fail", err));

app.use("/api",indexRouter); // /api = /api 라는 주소로 호출이 오면 indexRouter로 가고 -> /tasks주소로 오면 task api로 보내는 거!!!

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  

