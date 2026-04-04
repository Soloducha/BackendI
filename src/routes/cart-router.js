import { Router } from "express";
import { cartController } from "../controllers/cart-controller.js";

const router = Router();
//Rutas para Carts//
//listo todos los carts
router.get("/", cartController.getAll);

//listo un cart por su id
router.get("/:cid", cartController.getbyId);

//creo un nuevo cart
router.post("/", cartController.create);

//agrego un producto a un cart
router.post("/:cid/product/:pid", cartController.addtoCart);

export default router;
