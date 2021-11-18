const mongoose = require("mongoose");
const { ProdutoValidation } = require("./validacoes/produtoValidation");

const Categoria = mongoose.model("Categoria");
const Produto = mongoose.model("Produto");

class CategoriaController {
  // GET / Index
  index(req, res, next){
    Categoria.find()
    .select("_id produtos nome disponibilidade")
    .populate(["produtos"])
    .then((categorias) => res.send({ categorias }))
    .catch(next);
  }

  // GET /disponiveis
  indexDisponiveis(req,res,next){
    Categoria
    .find({ disponibilidade: true })
    .select("_id produtos nome")
    .then((categorias) => res.send({ categorias }))
    .catch(next);
  }

  // SHOW /:id show
  show(req,res,next){
      Categoria.findOne({ nome: req.params.nome })
      .select("_id produtos nome")
      .populate(["produtos"])
      .then(categoria => res.send({ categoria }))
      .catch(next);
    }


  // POST / store
  store(req,res,next){
    const { nome } = req.body;
    const categoria = new Categoria({ nome, disponibilidade: true });
    categoria.save()
    .then(() => res.send({ categoria }))
    .catch(next);
  }

  // PUT /:id update
  async update(req, res, next){
    try {
      const { nome, disponibilidade, produtos } = req.body;
      const categoria = await Categoria.findById(req.params.id);
  
      if(nome) categoria.nome = nome;
      if(disponibilidade !== undefined) categoria.disponibilidade = disponibilidade;
      if(produtos) categoria.produtos = produtos;
  
      await categoria.save();
      return res.send({ categoria });
    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // DELETE :id remove
  async remove(req,res,next){
    try{
      const categoria = await Categoria.findById(req.params.id);
      await categoria.remove();
      return res.send({ deletado: true });
    } catch(err){
      console.log(err)
      next(err)
    }
  }

  /**
   * PRODUTOS 
   */
  
  // GET /:id/produtos 
  async showProdutos(req,res,next){
    const { offset, limit } = req.query;
    try{
      const produtos = await Produto.paginate(
        { categoria: req.params.id },
        { offset: offset || 0, limit: Number(limit) || 30 }
      );
      return res.send({ produtos });
    } catch (err){
      console.log(err);
      next(err);
    }
  }

  // PUT /:id/produtos
  async updateProdutos(req,res,next){
    try{
      const categoria = await Categoria.findById(req.params.id);
      const { produtos } = req.body;
      if(produtos) categoria.produtos = produtos;
      await categoria.save();

      let _produtos = await Produto.find({
        $or: [
          { categoria: req.params.id },
          { _id: { $in: produtos } },
        ]
      }) ;
      _produtos = await Promise.all(_produtos.map(async (produto) => {
        if(!produtos.includes(produto._id.toString())){
          produto.categoria = null;
        } else {
          produto.categoria = req.params.id;
        }
        await produto.save();
        return produto;
      }));

      const resultado = await Produto.paginate(
        { categoria: req.params.id },
        { offset: 0, limit: 30 }
      );
        return res.send({ produtos: resultado });
    } catch (err){
      console.log(err);
      next(err);
    }
  }

}

module.exports = CategoriaController;