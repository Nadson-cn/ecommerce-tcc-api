require('dotenv/config');

// PACOTES 
const compression = require("compression");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const crypto = require("crypto");

// START
const app = express();

// AMBIENTE
const isProduction = process.env.NODE_ENV === "production";
const Port = process.env.PORT || 3000;


// ARQUIVOS ESTÁTICOS
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/images", express.static(__dirname + "/public/images"));

// SETUP MONGODB
const dbURI = process.env.MONGO_URL;
mongoose.connect(dbURI, { useNewUrlParser: true });

// SETUP EJS
app.set("view engine", "ejs");

// CONFIGURAÇÕES
if(!isProduction) app.use(morgan("dev"));
app.use(cors());
// ------ (Não mostrar para o cliente como foi desenvolvido) ----- //
app.disable('x-power-by');
app.use(compression());

// SETUP BODY PARSER
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5*1024*1024 }));
app.use(bodyParser.json({ limit: 1.5*1024*1025 }));

// MODELS
require("./models");

//ROTAS
app.use("/", require("./routes"));

// 404 - ROTA
app.use((req, res, next) => {
  const err = new ErrorEvent("Not found");
  err.status = 404;
  next(err);
});

// ROTA - 422, 500, 401
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  if(err.status == 404) console.warn("Error: ", err.message, new Date());
  res.json(err);
});

//ESCUTAR
app.listen(Port, (err) => {
  if(err) throw err;
  console.log(`Listening on ${Port}`);
});
