const express = require("express");
const cfg = require("./src/config/config");

const app = express();

app.listen(cfg.port, () => {
  console.log(`Para acessar o serviço: http://localhost:${cfg.port}`);
});
