const router = require("express").Router();

const auth = require("../../auth");

const CarrinhoController = require("../../../controllers/CarrinhoController");
const carrinhoController = new CarrinhoController();

router.get("/all", (carrinhoController.index));
router.get("/", (carrinhoController.show));
router.put("/:id", auth.required, (carrinhoController.update));

router.post("/", auth.required, carrinhoController.store);
router.delete("/", auth.required, carrinhoController.remove);

module.exports = router;