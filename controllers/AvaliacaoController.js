const mongoose = require("mongoose");

const Avaliacao = mongoose.model("Avaliacao");
const Produto = mongoose.model("Produto");

class AvaliacaoController {
  // GET / 
  async index(req, res, next){
    const { produto } = req.query;
    try {
      const avaliacoes = await Avaliacao.find({ produto });

      return res.send({ avaliacoes });
    } catch(err){
      console.log(err);
      next(err)
    }
  }

  // GET /:id
  async show(req, res, next){
    const { produto } = req.query;
    const { id: _id } = req.params;

    try {
      const avaliacao = await Avaliacao.findOne({ _id, produto });
      return res.send({ avaliacao });
    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // POST /
  async store(req, res ,next){
    const { nome, texto, pontuacao } = req.body;
    const { produto } = req.query;
    try {
      const avaliacao = new Avaliacao({ nome, texto, pontuacao, produto });

      const _produto = await Produto.findById(produto);
      if(!_produto) return res.status(422).send({ error: "Produto não existe!"});
      console.log(_produto.avaliacoes);
      _produto.avaliacoes.push(avaliacao._id);

      await _produto.save();
      await avaliacao.save();
      
      return res.send({ avaliacao });

    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // DELETE /:id remove

  async remove(req, res, next) {
    try {
      const avaliacao = await Avaliacao.findById(req.params.id);

      const produto = await Produto.findOne(avaliacao.produto);
      produto.avaliacoes = produto.avaliacoes.filter( item => item.toString() !== avaliacao._id.toString() );

      await produto.save();
      await avaliacao.remove();
      
      return res.send({ deletado: true });
    } catch(err) {
      next(err);
      console.log(err);
    }
  }
  
}

module.exports = AvaliacaoController;