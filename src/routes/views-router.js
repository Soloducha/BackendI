import { Router } from "express";
import { productManager } from "../managers/product-manager.js";

const router = Router();

// Rutas para la vista principal
router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { title: "Bienvenido a la tienda", products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", { title: "Productos en tiempo real" });
});

export default router;
