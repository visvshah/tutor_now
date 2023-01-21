import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./Routes/studentRoutes.js";
import tutorRoutes from "./Routes/tutorRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit:'5mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false}));

app.use(cors());
app.use('/api/students', studentRoutes)
app.use('/api/tutors', tutorRoutes)
console.log("URL: " + process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(5001, ()=> console.log(`Server runnning on port: 5001`)))
    .catch((error)=> console.log(error.message));
