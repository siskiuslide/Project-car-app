const express = require("express");
const garageController = require("../controllers/garage");

const router = express.Router();

router
  .route("/")
  .get(garageController.getVehicles)
  .post(garageController.addVehicle)
  .delete(garageController.deleteVehicle);

router.route("/:id").get(garageController.getSingleVehicle);

router.route("/sale").put(garageController.sellVehicle);

module.exports = router;
