//cd Hackathon/flipr/backend
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/songs", require("./routes/songs"));
app.use("/api/playlist", require("./routes/playlist"));

app.listen(port, () => {
  console.log(`Flipr backend listening on port ${port}`);
});
