const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EstoqueSchema = Schema({
    quantidade: { type: Number, default: 1 },
    produto: { type: Schema.Types.ObjectId, ref: "Produto", required: true },
},{ timestamps: true });

module.exports = mongoose.model("Estoque", EstoqueSchema);