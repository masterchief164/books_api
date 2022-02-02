const express = require("express");
const controller = require("../controllers/controller");

const postRouter = express.Router();


postRouter.post("/createUser", controller.createUser);
postRouter.put("/makePayment", controller.updateUser);

module.exports = postRouter;