require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express")
const app = express();
const contestRouter = require("./routers/router");


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/api", contestRouter);


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=> {
    if(err) {
        console.log(err);
    } else {
        console.log("Connected to MongoDB");
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
});