// const express = require("express");
// const router = express.Router();
// const productController = require("../controllers/productController");
// const adminAuth = require("../middleware/adminAuth");

// // Admin can add a product
// router.post("/", adminAuth, productController.addProduct);

// // Optionally expose listing for admin too
// router.get("/", adminAuth, productController.getProducts);

// module.exports = router;

const express = require("express");
const router = express.Router();
const adminProductController = require("../controllers/adminProductController");
const adminAuth = require("../middleware/adminAuth");

// CRUD routes (Protected)
router.post("/add", adminAuth, adminProductController.addProduct);
router.get("/", adminAuth, adminProductController.getAllProducts);
router.get("/counts-by-admin", adminAuth, adminProductController.getProductCountsByAdmin);
router.get("/:id", adminAuth, adminProductController.getProductById);
router.put("/update/:id", adminAuth, adminProductController.updateProduct);
router.delete("/delete/:id", adminAuth, adminProductController.deleteProduct);

module.exports = router;