const express = require("express");
const Financial = require("../model/financial");
const FinancialClient = require("../model/client");
const verify_token = require("../middleware/checkToken");
const amqp = require("amqplib");
const route = express.Router();

var channel, connection;

connect();
async function connect() {
  try {
    const amqpServer = "amqp://localhost";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ClientData");
    channel.consume("ClientData", (data) => {
      let receiveddata = JSON.parse((data.content).toString());
      
      const newData = new FinancialClient(receiveddata);
      //console.log("dados: " + newData.apikey);

      
      
     
      newData
        .save()
        .then((result) => {
          console.log("Contato salvo");
        })
        .catch((error) => {
          console.log("Erro: " + error);
        });


     
      

      channel.ack(data);
    });
  } catch (ex) {
    console.error(ex);
  }
}

route.post("/financial", verify_token, (req, res) => {

  FinancialClient.findOne({ apikey: req.data.apikey }, (error, result) => {
  
    if (error)
      return res.status(500).send({ output: `Erro ao localizar: ${error}` });
    if (!result)
      return res.status(400).send({ output: `Usuário não localizado` });
    
      const newData = new Financial(req.body);

  
      newData.apikey = req.data.apikey;
      newData
        .save()
        .then((result) => {
          res
            .status(201)
            .send({ output: "Cadastro realizado: ", payload: result });
        })
        .catch((error) => {
          res.status(500).send({ output: `Erro ao cadastrar: ${error}` });
        });


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
