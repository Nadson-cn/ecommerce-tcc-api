const mongoose = require("mongoose");

const Carrinho = mongoose.model("Carrinho");
const Produto = mongoose.model("Produto");

class CarrinhoController {
    async index(req, res, next){
        try {
          const carrinho = await Carrinho.find();
          return res.send({ carrinho });
        } catch(err){
          console.log(err);
          next(err)
        }
      }
    
      // GET /:id
      async show(req, res, next){
        const { usuario } = req.query;
        try {
          const carrinho = await Carrinho.findOne({ usuario });
          return res.send({ carrinho });
        } catch(err){
          console.log(err);
          next(err);
        }
      }
}