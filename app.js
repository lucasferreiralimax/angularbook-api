require("./src/model/db");
const http = require("http");
const express = require("express");
const status = require("http-status");
const bodyparser = require("body-parser");
const cors = require("cors");
const router = require("./src/controller/angularbook_controller");

const port = 80
const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.use("/", router);

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send();
});

app.use((error, req, res, next) => {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

app.set("port", port);
const server = http.createServer(app);
server.listen(port);
