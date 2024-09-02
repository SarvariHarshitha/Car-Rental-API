import Router from "router";
import { createCar, getACar, getRides, updateRent } from "./handlers/cars.js";

const router1 = new Router();

//Car
router1.post("/create", createCar);
router1.get("/get-rides", getRides);
router1.post("/rent", getACar )
router1.post("/update-rent-history", updateRent)

export default router1;