import { Router } from "express";
import CartController from "../controller/carts.controller";

const router=Router()
const cartController = new CartController()

router.post("/", cartController.createEmptycart())

router.get("/:id", cartController.getCartById())

router.post("/:cid/product/:pid", cartController.addProductToCart())


export default router