const express = require("express");
const app = express();
const PORT = 63279;
const router = require("./routes/routesPost");
const dbConnection = require("./config/config");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

dbConnection()

app.use((req, res) => {
    res.send("404 - Página No Encontrada")
})

app.listen(PORT, (req, res) => {
    console.log(`Server Listening on Port: http://localhost:${PORT}`);  
})

module.exports = app;