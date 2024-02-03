import express from "express";
import {container} from "tsyringe"
import mainController from "./controller/main.controller";
import { Method } from "../../shared/enum/enum.routes";

const router = express.Router();
const controller = container.resolve(mainController);


router.route("/")
  .get(controller.getValue);


  router.route("/:key")
  .get(controller.getValueById);


  router.route("/add-value")
  .post(controller.addValue);


  router.route("/update/:key")
  .put(controller.updateValue);


  router.route("/delete/:key")
  .delete(controller.deleteValue);



export default router;
