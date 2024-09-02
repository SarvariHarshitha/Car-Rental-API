import Router from "router";
import { createUser, loginUser } from "./handlers/users.js";

const router = new Router();


router.post("/signup", createUser);
router.post("/login", loginUser);


export default router;