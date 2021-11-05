const router = require("express").Router();

const auth = require("../../auth");

const CarrinhoController = require("../../../controllers/CarrinhoController");
const carrinhoController = new CarrinhoController();

router.get("/all", (carrinhoController.index));
router.get("/:id", auth.required, (carrinhoController.show));

router.post("/", auth.required, carrinhoController.store);

module.exports = router;