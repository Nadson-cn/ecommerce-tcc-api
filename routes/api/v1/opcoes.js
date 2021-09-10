const router = require("express").Router();

const Validation = require("express-validation");
const { OpcaoValidation } = require("../../../controllers/validacoes/opcaoValidation");

const OpcaoController  = require("../../../controllers/OpcaoController");
const opcaoController = new OpcaoController();

router.get("/", opcaoController.index);
router.get("/:id", Validation(OpcaoValidation.show), opcaoController.show);
router.post("/", Validation(OpcaoValidation.store), opcaoController.store);

router.delete("/:id", opcaoController.remove);


module.exports = router;