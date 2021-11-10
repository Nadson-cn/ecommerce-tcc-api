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
        const { usuario } = req.body;
        try {
          const carrinho = await Carrinho.findOne({ usuario: usuario});
          console.log(usuario);
          if(!carrinho) res.send({ message: 'User not found'});
          return res.send({ carrinho });
        } catch(err){
          console.log(err);
          next(err);
        }
      }

    async store(req, res, next){

      const { usuario } = req.query;
      const { produto, quantidade, precoUnitario } = req.body;
      try {
          const _carrinho = new Carrinho({ usuario, produto, quantidade, precoUnitario });

          const _usuario = await Usuario.findById(usuario);
          if(!_usuario) return res.status(422).send({ error: "Usuario não cadastrado!"});
         //_usuario.carrinho.push(_carrinho._id)

          //await _usuario.save();
          await _carrinho.save();
            
            return res.send({ _carrinho });
        } catch(err){
            console.log(err);
        };
    }

    async update(req, res, next) {
      const { _carrinho } = req.query;
      const { produto, quantidade, precoUnitario } = req.body;

      const carrinho = await Carrinho.findOne(_carrinho);
      console.log(carrinho)
        if(!carrinho) return res.status(422).send({ error: "Carrinho não existe!"});
        
        if(quantidade) carrinho.quantidade = quantidade;
        if(produto) carrinho.produto = produto;
        if(precoUnitario) carrinho.precoUnitario = precoUnitario;
        
        
        await carrinho.save()
        res.send({carrinho});

    }

    async remove(req, res, next) {
      try{

        const { carrinho } = req.query;
        const _carrinho = await Carrinho.findById(carrinho);
        console.log(_carrinho);
        await _carrinho.remove();
        return res.send({ remove: true});

      }catch(err){
        console.log(err);
      }
    }
}

module.exports = CarrinhoController;