const router = require("express").Router();

const Validation = require("express-validation");
const { LojaValidation } = require("../../../controllers/validacoes/lojaValidation");
const { AvaliacaoValidation } = require("../../../controllers/validacoes/avaliacaoValidation");

const auth = require("../../auth");

const AvaliacaoController = require("../../../controllers/AvaliacaoController");
const avaliacaoController = new AvaliacaoController();

/**
 * CLIENTES - VISITANTES
 */
router.get("/", Validation(AvaliacaoValidation.index), avaliacaoController.index);
router.get("/:id", Validation(AvaliacaoValidation.show), avaliacaoController.show);
router.post("/", Validation(AvaliacaoValidation.store), auth.required, avaliacaoController.store);

/**
 * ADMIN 
 */ 
router.delete("/:id", auth.required, LojaValidation.admin, Validation(AvaliacaoValidation.remove), avaliacaoController.remove);


module.exports = router;