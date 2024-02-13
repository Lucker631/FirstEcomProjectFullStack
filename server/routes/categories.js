const express = require("express");
const router = express.Router();
const controller = require("../controllers/categories");

router.post("/add", controller.category_add);
router.get("/categories", controller.allCategories);
router.post("/delete", controller.category_delete);
router.post("/update", controller.category_update);
module.exports = router;
