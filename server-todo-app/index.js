const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())

const PORT = 4000;

app.get("/", (req, res) => {
    res.json(req.query)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});