const express = require("express");
const Financial = require("../model/financial");
const verify_token = require("../middleware/checkToken");

const route = express.Router();

route.post("/financial", verify_token, (req, res) => {
  const data = new Financial(req.body);
  data.apikey = req.data.apikey;
  data.clientid = req.data.id;

  data
    .save()
    .then((result) => {
      res.status(201).send({ output: "Cadastro realizado: ", payload: result });
    })
    .catch((error) => {
      res.status(500).send({ output: `Erro ao cadastrar: ${error}` });
    });
});

route.put("/financial/:id", verify_token, (req, res) => {
  Financial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, data) => {
      if (error)
        return res
          .status(500)
          .send({ output: `Erro na atualização: ${error}` });
      if (!data)
        return res
          .status(400)
          .send({ output: `Não foi possivel atualizar: ${error}` });
      res.status(202).send({ output: `Atualizado`, payload: data });
    }
  );
});

module.exports = route;
