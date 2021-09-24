const mongoose = require("mongoose");
const FichaTecnica = mongoose.model("FichaTecnica");
const Produto = mongoose.model("Produto");

class FichaController {

  async index(req, res, next){
    try {
      const ficha = await FichaTecnica.find();
      return res.send({ ficha });
    } catch(err){
      console.log(err);
      next(err)
    }
  }  
  // POST / - store
  async store(req,res,next){
    const { especificacoes, formato, cor_exterior, painel_lateral, placa_mae, baias, dimensoes } = req.body;
    const { produto } = req.query;
    try {
      const ficha_tecnica = new FichaTecnica(
        { 
            especificacoes,
            formato,
            cor_exterior,
            painel_lateral,
            placa_mae,
            baias,
            dimensoes,
            produto 
        });

      const _produto = await Produto.findById(produto);
      if(!_produto) return res.status(422).send({ error: "Produto não existe!"});

      await _produto.save();
      await ficha_tecnica.save();
      
      return res.send({ ficha_tecnica });
  } catch(err){
    console.log(err);
    next(err);
    }
  }  
   // GET /:id 
   async show(req,res,next){
    const { produto } = req.params;
    //const { id: _id } = req.params;

    try{
      const ficha_tecnica = await FichaTecnica.find({ produto: req.params.id });
      //const ficha_tecnica = await FichaTecnica.findOne({ _id, produto });
      return res.send({ ficha_tecnica });

    } catch(err){
      console.log(err);
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const ficha = await FichaTecnica.findById(req.params.id);
      await ficha.remove();
      
      return res.send({ deletado: true });
    } catch(err) {
      next(err);
      console.log(err);
    }
  }
}

module.exports = FichaController;