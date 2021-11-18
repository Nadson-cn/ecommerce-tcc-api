const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const CarrinhoSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
    produto: { type: [{ type: Schema.Types.ObjectId, ref: "Produto" }] },
    precoUnitario: { type: Number },
}, { timestamps: true });

CarrinhoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Carrinho", CarrinhoSchema);