const moongoose = require("mongoose");
const moongoosePaginate = require("mongoose-paginate");
const Schema = moongoose.Schema;

const PedidoSchema = Schema({
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    carrinho: {
        type: [{
            produto: { type: [{ type: Schema.Types.ObjectId, ref: "Produto", required: true }]},
            quantidade: { type: Number, default: 1 },
            //precoUnitario: { type: Number, required: true }
        }]
    }, 
    imagens: { 
        type: [{ type: String }] 
      },
    //pagamento: { type: Schema.Types.ObjectId, ref: "Pagamento", required: true },
    //entrega: { type: Schema.Types.ObjectId, ref: "Entrega", required: true },
    //cancelado: { type: Boolean, default: false }
    
}, { timestamps: true });

PedidoSchema.plugin(moongoosePaginate);

module.exports = moongoose.model("Pedido", PedidoSchema);