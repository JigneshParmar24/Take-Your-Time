const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./Models/db");
const authRouter = require("./Routes/auth");
const taskRouter = require("./Routes/task")

dotenv.config();

const app = express();
const Port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
    res.send("kept you waiting huh!");
})

db.then(() => {
    app.listen(Port, () => console.log(`Server running at Port : ${Port}`));
}).catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
})