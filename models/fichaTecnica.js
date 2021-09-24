const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FichaTecnicaSchema = Schema({
    produto: { type: Schema.Types.ObjectId, ref: "Produto", required: true },
    especificacoes : { type: [{ type: String }]},
    placa_mae : { type: [{ type: String }]},
    baias : { type: [{ type: String }]},
    dimensoes: { type: String, required: true }
    }, { timestamp: true });

module.exports = mongoose.model("FichaTecnica", FichaTecnicaSchema);