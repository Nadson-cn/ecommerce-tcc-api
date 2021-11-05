const mongoose = require("mongoose");

const Carrinho = mongoose.model("Carrinho");
const Usuario = mongoose.model("Usuario");

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

    async store(req, res, next){

        const { produto, quantidade, precoUnitario } = req.body;
        const { usuario } = req.query;
        try {
            const carrinho = new Carrinho({ usuario, produto, quantidade, precoUnitario });

            const _usuario = await Usuario.findById(usuario);
            if(!_usuario) return res.status(422).send({ error: "Usuario não cadastrado!"});
            _usuario.carrinho.push(carrinho._id);

            await _usuario.save();
            await carrinho.save();
            
            return res.send({ carrinho });
        } catch(err){
            console.log(err);
        };
    }
}

module.exports = CarrinhoController;