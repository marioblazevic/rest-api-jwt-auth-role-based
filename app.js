const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");

dotenv.config();
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected");
});

const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/user", authRoutes);
app.use("/posts", postRoutes);
app.use("/todos", todoRoutes);

app.use((req, res) => {
  res.send("Page not found!");
});

app.listen(process.env.PORT || 30000);
