const express = require("express");
const dealController = require("../controllers/deal");
const router = express.Router();

router.post("/adddeal", dealController.addSale);
router.get("/getdeal", dealController.getSale);
router.get("/getsingledeal/:saleId", dealController.getSingleSale);
router.patch("/updatedeal/:saleId", dealController.updateSale);
router.patch("/addproduct/:saleId", dealController.addSalesProduct);
router.delete("/removeproduct/:saleId", dealController.deleteSalePrdunct);
router.delete("/removedeal/:saleId", dealController.deleteSale);

module.exports = router;
