const mongoose = require("mongoose");
const Opcao = mongoose.model("Opcao");
const Produto = mongoose.model("Produto");

class OpcaoController {

  async index(req, res, next){
    //const { produto } = req.query;
    try {
      const opcoes = await Opcao.find();
      return res.send({ opcoes });
    } catch(err){
      console.log(err);
      next(err)
    }
  }  
  // POST / - store
  async store(req,res,next){
    const { nome, skins, skin, skinAplicada, image, leds, cor, corAPlicada } = req.body;
    const { produto } = req.query;
    try {
      const opcao = new Opcao(
        { 
          nome,
          skins, 
          skin, 
          skinAplicada, 
          image, 
          leds, 
          cor, 
          corAPlicada, 
          produto 
        });

      const _produto = await Produto.findById(produto);
      if(!_produto) return res.status(422).send({ error: "Produto não existe!"});

      await _produto.save();
      await opcao.save();
      
      return res.send({ opcao });
  } catch(err){
    console.log(err);
    next(err);
    }
  }  
   // GET /:id 
   async show(req,res,next){
    const { produto } = req.query;
    const { id: _id } = req.params;

    try{
      const opcoes = await Opcao.findOne({ _id, produto });
      return res.send({ opcoes });

    } catch(err){
      console.log(err);
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const opcao = await Opcao.findById(req.params.id);

      //const produto = await Produto.findOne(opcao.produto);
      //produto._opcao = produto._opcao.filter( item => item.toString() !== opcao._id.toString() );

      //await produto.save();
      await opcao.remove();
      
      return res.send({ deletado: true });
    } catch(err) {
      next(err);
      console.log(err);
    }
  }

  // AVALIAÇOES 
  // GET /:id/avaliacoes
  async showAvaliacoes(req,res,next){
    try{  
      const avaliacoes = await Avaliacao.find({ produto: req.params.id });
      return res.send({ avaliacoes });
    } catch(err){
      next(e);
      console.log(err);
    }
  }
}


module.exports = OpcaoController;