const express = require("express");
const router = express.Router();
const controller = require("../controllers/products");

router.post("/add", controller.product_add);
router.post("/delete", controller.product_delete);
router.post("/products", controller.product_show);
router.post("/update", controller.product_update);

// router.delete("/remove/:_id", controller.remove);
// router.post("/upload", controller.upload);
// router.get("/get_all", controller.get_all);

module.exports = router;
