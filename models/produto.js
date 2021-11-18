const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const ProdutoSchema = Schema({
  titulo: { type: String, required: true },
  marca: { type: String, required: true },
  tipo: { type: String, required: true },
  disponibilidade: { type: Boolean, default: true },
  Imagem_URL: { type: String },
  preco: { type: Number, required: true},
  promocao: { type: Number },
  descricao: { type: String },
  quantidade: { type: Number },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria" },
  avaliacoes: { type: [{ type: Schema.Types.ObjectId, ref: "Avaliacoes" }] },
  opcao: { type: Schema.Types.ObjectId, ref: "Opcao" },
  estoque: { type: Schema.Types.ObjectId, ref: "Estoque" },
  fichaTecnica: { type: Schema.Types.ObjectId, ref: "FichaTecnica" } 
}, { timestamps: true });

ProdutoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Produto", ProdutoSchema);