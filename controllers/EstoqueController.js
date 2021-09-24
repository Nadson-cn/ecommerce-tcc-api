const mongoose = require("mongoose");

const Estoque = mongoose.model("Estoque");
const Produto = mongoose.model("Produto");

class EstoqueController {
  // GET / 
  async index(req, res, next){
    try {
      const estoques = await Estoque.find();
      return res.send({ estoques });
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
      const estoque = await Estoque.findOne({ _id, produto });
      return res.send({ estoque });
    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // POST /
  async store(req, res ,next){
    const { quantidade } = req.body;
    const { produto } = req.query;
    try {
      const estoque = new Estoque({ quantidade, produto });

      const _produto = await Produto.findById(produto);
      if(!_produto) return res.status(422).send({ error: "Produto não existe!"});
      _produto.estoques.push(estoque._id);

      await _produto.save();
      await estoque.save();
      
      return res.send({ estoque });

    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // DELETE /:id remove

  async remove(req, res, next) {
    try {
      const estoque = await Estoque.findById(req.params.id);

      const produto = await Produto.findOne(estoque.produto);
      produto.estoques = produto.estoques.filter( item => item.toString() !== estoque._id.toString() );

      await produto.save();
      await estoque.remove();
      
      return res.send({ deletado: true });
    } catch(err) {
      next(err);
      console.log(err);
    }
  }
  
}

module.exports = EstoqueController;