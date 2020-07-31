const express = require("express");
const router = express.Router();

//Invoke controller here,

const userController = require("../controllers/user");

router.get("/get-all-user", userController.getAll );
router.post("/add-user" , userController.addRows);
router.put("/edit-user/:userId", userController.editRows);
router.delete("/delete-user/:userId", userController.deleteRow);

module.exports = router;