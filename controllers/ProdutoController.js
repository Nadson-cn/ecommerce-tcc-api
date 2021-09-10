const mongoose = require("mongoose");
const categoria = require("../models/categoria");

const Produto = mongoose.model("Produto");
const Categoria = mongoose.model("Categoria");

const Avaliacao = mongoose.model("Avaliacao");
const Estoque = mongoose.model("Estoque");

const getSort = (sortType) => {
  switch(sortType){
    case "alfabetica_a-z":
      return { titulo: 1 };
    case "alfabetica_z-a":
      return { titulo: -1 };
    // -- -- - x - -- -- //
    case "preco-crescente":
      return { titulo: 1 };
    case "preco-decrescente":
      return { titulo: -1 };
    default:
      return {};
  }
};

class ProdutoController {
  // ADMIN  
  
  // POST / - store
  async store(req,res,next){
    const { titulo, categoria: categoriaId, marca, tipo, preco, Imagem_URL, promocao } = req.body;

    try {
        
        const produto = new Produto({
            titulo, 
            disponibilidade: true, 
            categoria: categoriaId, 
            tipo,
            preco, 
            marca,
            Imagem_URL,
            promocao, 
        });

        const categoria = await Categoria.findById(categoriaId);
        categoria.produtos.push(produto._id);

        await produto.save();
        await categoria.save();

        return res.send({ produto });

    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // PUT /:id
  async update(req,res,next){
    const { titulo, marca, Imagem_URL, disponibilidade, categoria, tipo, preco, promocao } = req.body;

    try{
      const produto = await Produto.findById(req.params.id);
      if(!produto) return res.status(400).send({ error: "Produto não encontrado." })

      if(titulo) produto.titulo = titulo;
      if(marca) produto.marca = marca;
      if(tipo) produto.tipo = tipo;
      if(Imagem_URL) produto.Imagem_URL = Imagem_URL;
      if(disponibilidade !== undefined) produto.disponibilidade = disponibilidade;
      if(preco) produto.preco = preco;
      if(promocao) produto.promocao = promocao;
    
       if( categoria && categoria.toString() !== produto.categoria.toString() ){
        const oldCategoria = await Categoria.findById(produto.categoria);
        const newCategoria = await Categoria.findById(categoria);

        if(oldCategoria && newCategoria){
          oldCategoria.produtos = oldCategoria.produtos.filter(item => item.toString() !== produto._id.toString());
          newCategoria.produtos.push(produto._id);
          produto.categoria = categoria;
          await oldCategoria.save();
          await newCategoria.save();
        } else if(newCategoria){
          newCategoria.produtos.push(produto._id);
          produto.categoria = categoria;
          await newCategoria.save();
        }
      }

      await produto.save();
      return res.send({ produto });

    }catch(err){
      console.log(err);
      next(err);
    }
  }

  // PUT /imagens/:id
  async updateImages(req, res, next){
    try {
      const produto = await Produto.findOne({ _id: req.params.id });
      if(!produto) return res.status(400).send({ error: "Produto não encontrado."});

      const novasImagens = req.files.map(item => item.filename);
      produto.fotos = produto.fotos.filter(item => item).concat(novasImagens);

      await produto.save();
      return res.send({ produto });
    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // DELETE /:id - remove
  async remove(req,res,next){
    try {
      const produto = await Produto.findOne({ _id: req.params.id });
      if(!produto) return res.status(400).send({ error: "Produto não encontrado." });

      const categoria = await Categoria.findById(produto.categoria);
      if(categoria){
        categoria.produtos = categoria.produtos.filter(item => item !== produto._id);
        await categoria.save();
      }

      await produto.remove();
      return res.send({ deleted: true });
    } catch (err){
      console.log(err);
      next(err);
    }
  }

  /**
   * CLIENTE
   */

  // GET / - index
  async index(req,res,next){
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 30;
    try{
      const produtos = await Produto.paginate(
        { offset, limit, sort: getSort(req.query.sortType) }
      );
      return res.send({ produtos });
    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // GET /disponiveis 
  async indexDisponiveis(req,res,next){
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 30  ;
    try{
      const produtos = await Produto.paginate(
        { disponibilidade: true },
        { offset, limit, sort: getSort(req.query.sortType) }
      );
      return res.send({ produtos });
    } catch(err){
      console.log(err);
      next(err);
    }
  }

  // GET /search/:search
  async search(req,res,next){
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 30  ;
    const search = new RegExp(req.params.search, "i");

    try{
      const produtos = await Produto.paginate(
        { 
          $or: [
            { "titulo": { $regex: search } },
            { "marca": { $regex: search } },
          ]
        },
        { offset, limit, sort: getSort(req.query.sortType) }
      );
      return res.send({ produtos });
    } catch(err){
      next(err);
    }
  }

   // GET /:id 
   async show(req,res,next){
    try{
      const produto = await Produto
        .findById(req.params.id)
        .populate([
          "categorias",
        ]);
      return res.send({ produto });
    } catch(err){
      console.log(err);
      next(err);
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

  // VARIAÇÕES
  // GET /:id/variacoes
  async showVariacoes(req,res,next){
    try{  
      const estoque = await Estoque.find({ produto: req.params.id });
      return res.send({ estoque });
    } catch(err){
      next(e);
      console.log(err);
    }
  }
};

module.exports = ProdutoController;