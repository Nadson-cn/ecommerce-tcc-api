const mongoose = require("mongoose");

const Pedido = mongoose.model("Pedido");
const Usuario = mongoose.model("Usuario");
const Produto = mongoose.model("Produto");
const Estoque = mongoose.model("Estoque");
const Pagamento = mongoose.model("Pagamento");
const Entrega = mongoose.model("Entrega");
const Cliente = mongoose.model("Cliente");
const RegistroPedido = mongoose.model("RegistroPedido");

const { calcularFrete } = require("./integracoes/correios");
//const PagamentoValidation = require("./validacoes/pagamentoValidation");
//const EntregaValidation = require("./validacoes/entregaValidation");
//const QuantidadeValidation = require("./validacoes/quantidadeValidation");

//const EmailController = require("./EmailController");

const CarrinhoValidation = require("./validacoes/carrinhoValidation");

class PedidoController {
    // ADMIN
    //get /admin indexAdmin
    async indexAdmin(req, res, next) {
        const { offset, limit } = req.query;
        try {
            const pedidos = await Pedido.paginate(
                {
                    offset: Number(offset || 0),
                    limit: Number(limit || 30),
                    populate: ["cliente", "pagamento", "entrega"]
                }
            );
            pedidos.docs = await Promise.all(pedidos.docs.map(async (pedido) => {
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }));
                return pedido;
            }));
            return res.send({ pedidos });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    //get /admin/:id showAdmin
    async showAdmin(req, res, next) {
        try {
            const pedido = await Pedido
                .findOne({ _id: req.params.id })
                .populate(["cliente", "pagamento", "entrega"]);
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }))
            const registros = await RegistroPedido.find({ pedido: pedido._id });
            return res.send({ pedido, registros });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    //delete /admin/:id removeAdmin
    async removeAdmin(req, res, next) {
        try {
            const pedido = await Pedido.findOne({ _id: req.params.id })
            if (!pedido) return res.status(400).send({ error: "Pedido não encontrado" });
            pedido.cancelado = true;

            const registroPedido = new RegistroPedido({
                pedido: pedido._id,
                tipo: "pedido",
                situacao: "pedido_cancelado",
            });
            await registroPedido.save();
            // Registro de atividade = pedido cancelado
            // Enviar Email para cliente = pedido cancelado

            await pedido.save();

            return res.send({ cancelado: true });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    //get /admin/:id/carrinho showCarrinhoPedidoAdmin
    async showCarrinhoPedidoAdmin(req, res, next) {
        try {
            const pedido = await Pedido.findOne({ _id: req.params.id });
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Variacao.findById(item.variacao);
                return item;
            }))
            return res.send({ carrinho: pedido.carrinho });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // CLIENTE 

    // get / index 
    async index(req, res, next) {
        const { offset, limit } = req.query;
        try {
            const cliente = await Cliente.findById({ usuario: req.payload.id });
            const pedidos = await Pedido.paginate(
                { cliente: cliente._id },
                {
                    offset: Number(offset || 0),
                    limit: Number(limit || 30),
                    populate: ["cliente"]
                });
            pedidos.docs = await Promise.all(pedidos.docs.map(async (pedido) => {
                pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                    item.produto = await Produto.findById(item.produto);
                    //item.variacao = await Variacao.findById(item.variacao);
                    return item;
                }))
                return pedido;
            }));
            return res.send({ pedidos });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    // get /:id show
    async show(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            const pedido = await Pedido
                .findOne({ cliente: cliente._id, _id: req.params.id })
                .populate(["cliente", "pagamento", "entrega"]);
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                item.variacao = await Produto.findById(item.variacao);
                return item;
            }))
            const registros = await RegistroPedido.find({ pedido: pedido._id });
            const resultado = await calcularFrete({ cep: "38740182", produtos: pedido.carrinho });

            return res.send({
                //pedido,
                //registros,
                resultado
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // post /:id store
    async store(req, res, next) {
        const { carrinho } = req.body;
        try {

            // CHECAR DADOS DO CARRINHO
            //if (!await CarrinhoValidation(carrinho)) return res.status(422).send({ error: "Carrinho inválido" });

            const cliente = await Cliente.findOne({ usuario: req.payload.id });
/*
            const novoPagamento = new Pagamento({
                valor: pagamento.valor,
                forma: pagamento.forma,
                status: "Iniciando",
                payload: pagamento
            });

            const novaEntrega = new Entrega({
                status: "nao_iniciado",
                custo: entrega.custo,
                prazo: entrega.prazo,
                tipo: entrega.tipo,
                payload: entrega
            });
*/
            const pedido = new Pedido({
                cliente: cliente._id,
                carrinho
                //pagamento: novoPagamento._id,
                //entrega: novaEntrega._id
            });

  //          novoPagamento.pedido = pedido._id;
    //        novaEntrega.pedido = pedido._id;

            await pedido.save();
      //      await novoPagamento.save();
        //    await novaEntrega.save();

            const registroPedido = new RegistroPedido({
                pedido: pedido._id,
                tipo: "pedido",
                situacao: "pedido_criado",
            });
            await registroPedido.save();

            // Notificar via email - Cliente e admin = novo pedido

            return res.send({ pedido: Object.assign({}, pedido._doc, { cliente }) });

        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // delete /:id remove
    async remove(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            if (!cliente) return res.status(400).send({ error: "Cliente não encontrado" });
            const pedido = await Pedido.findOne({ cliente: cliente._id, _id: req.params.id })
            if (!pedido) return res.status(400).send({ error: "Pedido não encontrado" });
            pedido.cancelado = true;

            const registroPedido = new RegistroPedido({
                pedido: pedido._id,
                tipo: "pedido",
                situacao: "pedido_cancelado",
            });
            await registroPedido.save();
            // Registro de atividade = pedido cancelado
            // Enviar Email para Admin = pedido cancelado

            await pedido.save();

            return res.send({ cancelado: true });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    // get /:id/carrinho showCarrinhoPedido
    async showCarrinhoPedido(req, res, next) {
        try {
            const cliente = await Cliente.findOne({ usuario: req.payload.id });
            console.log(cliente);
            const pedido = await Pedido.findOne({ cliente: cliente._id, _id: req.query.id });
            console.log(pedido);
            pedido.carrinho = await Promise.all(pedido.carrinho.map(async (item) => {
                item.produto = await Produto.findById(item.produto);
                return item;
            }));
            return res.send({ carrinho: pedido.carrinho });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = PedidoController;