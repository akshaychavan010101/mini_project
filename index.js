const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const {TodoRouter} = require("./routes/todo.routes");
const { UserRouter } = require("./routes/users.route");
const app = express();
const cors = require("cors");

app.use(cors());



app.get("/",(req,res)=>{
    res.send("Hello");
})


app.use(TodoRouter,UserRouter);

app.listen(process.env.Port, async () => {
    try {
        await connection
        console.log("Running and Connected to DB");
    } catch (error) {
       console.log(error);
    }
})