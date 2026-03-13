import { Router } from "express";
import { cartManager } from "../managers/cart-manager.js";

const router = Router();
//Rutas para Carts//
//listo todos los carts
router.get("/", async (req, res) => {
  return res.json(await cartManager.getCarts());
});

//listo un cart por su id
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  return res.json(await cartManager.getCartById(cid));
});

//creo un nuevo cart
router.post("/", async (req, res) => {
  const response = await cartManager.addCart();
  res.json(response);
});

//agrego un producto a un cart
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const response = await cartManager.addtoCart(cid, pid);
  if (response) {
    res.json(response);
  } else {
    res.status(404).json({ message: "Carrito o producto no encontrado" });
  }
});

export default router;
