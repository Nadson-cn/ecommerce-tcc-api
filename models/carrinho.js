const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const CarrinhoSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    Produto: { type: [{ type: Schema.Types.ObjectId, ref: "Produto", required: true }] },
    quantidade: { type: Number, default: 1 },
    precoUnitario: { type: Number, required: true },
}, { timestamps: true });

CarrinhoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Carrinho", CarrinhoSchema);