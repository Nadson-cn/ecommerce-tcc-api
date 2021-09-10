const mongoose = require("mongoose");

const Estoque = mongoose.model("Estoque");
const Produto = mongoose.model("Produto");

class VariacaoController {

    // GET / - index
    async index(req,res,next){
        const { produto } = req.query;
        console.log(produto)
        try {
            const estoque = await Estoque.find({ produto });
            return res.send({ estoque });
        }catch(e){
            next(e);
        }
    }

    async all(req,res,next){
        try {
            const estoque = await Estoque.find();
            return res.send({ estoque });
        }catch(e){
            console.log(e);
            next(e);
        }
    }

    // GET /:id - show
    async show(req,res,next){
        const { produto } = req.query;
        const { id: _id } = req.params;
        try {
            const estoque = await Estoque.findOne({ produto, _id });
            return res.send({ estoque });
        }catch(e){
            next(e);
        }
    }

    // POST / - store
    async store(req,res,next){
        const { quantidade } = req.body;
        const { produto } = req.query;
        try {
            const estoque = new Estoque({
                quantidade, produto
            });

            const _produto = await Produto.findById(produto);
            if(!_produto) return res.status(400).send({ error: "Produto não encontrado." });
            _produto.estoque.push(estoque._id);

            await _produto.save();
            await estoque.save();
            return res.send({ estoque });
        } catch(e){
            console.log(e);
            next(e);
        }
    }

    // PUT /:id - update
    async update(req,res,next){
        const { quantidade } = req.body;
        
        const { produto } = req.query;
        const { id: _id } = req.params;
        try {
            const estoque = await Estoque.findOne({ produto, _id });
            if(!estoque) return res.status(400).send({ error: "Variação não encontrada" });
            if( quantidade ) estoque.quantidade = quantidade;

            await estoque.save();
            return res.send({ estoque });
        } catch(err){
            console.log(err)
            next(err);
        }
    }

    // PUT /images/:id - updateImages
    async updateImages(req,res,next){
        const { produto } = req.query;
        const { id: _id } = req.params;
        try {
            const variacao = await Variacao.findOne({ produto, _id });
            if(!variacao) return res.status(400).send({ error: "Variação não encontrada" });

            const novasImagens = req.files.map(item => item.filename);
            variacao.fotos = variacao.fotos.filter(item => item).concat(novasImagens);

            await variacao.save();
            return res.send({ variacao });

        }catch(e){
            next(e);
        }
    }

    // DELETE /:id - remove
    async remove(req,res,next){
        const { produto } = req.query;
        const { id: _id } = req.params;
        try {
            const estoque = await Estoque.findOne({ produto, _id });
            if(!estoque) return res.status(400).send({ error: "Variação não encontrada" });

            const _produto = await Produto.findById(estoque.produto);
            _produto.estoque = _produto.estoque.filter(item => item.toString() !== estoque._id.toString());
            await _produto.save();

            await estoque.remove();

            return res.send({ deletado: true });

        }catch(e){
            console.log(e);
            next(e);
        }
    }

}

module.exports = VariacaoController;