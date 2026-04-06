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

//actualizo la cantidad de un producto en el carrito
router.put("/:cid/product/:pid", cartController.updateQuantity);

//elimino un producto del carrito
router.delete("/:cid/product/:pid", cartController.removeFromCart);

router.delete("/:id", cartController.delete);

export default router;
