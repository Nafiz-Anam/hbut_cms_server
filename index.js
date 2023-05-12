const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

//route import
const Router = require("./routes/Router");

require("dotenv").config();
const app = express();

//middle-wares
app.use(cors());
app.use(require("sanitize").middleware);
app.use(express.json());
app.use("/api/v1", Router);


app.get("/", (req, res) => {
    res.send("HBUT CMS System API");
});

app.listen(port, () => {
    console.log(`listening at ${port}`);
});
