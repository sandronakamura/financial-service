const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cfg = require("./config/config");
const financialRoutes = require("./routes/financial");

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

app.use("/clients", financialRoutes);

mongoose.connect(cfg.db_path, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(cfg.port, () => {
  console.log(`Para acessar o serviço: http://localhost:${cfg.port}`);
});
