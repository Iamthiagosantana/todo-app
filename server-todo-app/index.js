const express = require("express");

const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
    console.log("Hello World!");
    res.send("<div>AAAAAAAAAAA<h1>hello</h1></div>");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});