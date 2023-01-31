const express = require("express");
const serviceController = require("../controllers/servicing");

const router = express.Router();

router.route("/").put(serviceController.addServiceRecord).delete(serviceController.deleteServiceRecord);

router.route("/:vehicleId").get(serviceController.getVehicleServiceRecords);

module.exports = router;
