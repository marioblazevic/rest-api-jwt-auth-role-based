const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");

dotenv.config();
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected");
});

const postsRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

// const accesLogStream = fs.createWriteStream("./logs/access.log", {
//   flags: "a",
// });

app.use(compression());
app.use(helmet());
app.use(cors());
// app.use(morgan("combined", { stream: accesLogStream }));
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
  res.send("We are on home!");
});

app.use((req, res) => {
  res.send("Page not found!");
});

app.listen(process.env.PORT || 30000);
