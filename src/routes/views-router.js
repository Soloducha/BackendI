import { Router } from "express";
import { productService } from "../services/product-service.js";
import { cartService } from "../services/cart-service.js";
import _ from "mongoose-paginate-v2";

const router = Router();

// Rutas para la vista principal
router.get("/", async (req, res) => {
  const products = await productService.getAll({
    limit: 10,
    page: 1,
    sort: "asc",
  });
  res.render("home", {
    title: "Bienvenido a la tienda",
    products: products.docs,
  });
});

export default router;
