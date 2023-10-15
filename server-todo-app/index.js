require('dotenv').config()

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const todosRouter = require("./routers/todos")
const authRouter = require("./routers/auth");

const app = express();

app.use(express.json())

const corsContent = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsContent))
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/todos", todosRouter)


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log(`The Database is connected successfully`))
    .catch(err => console.log(err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});