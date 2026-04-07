import { Router } from "express";
import { productService } from "../services/product-service.js";
import { cartService } from "../services/cart-service.js";
import _ from "mongoose-paginate-v2";

const router = Router();

// Rutas para la vista principal
router.get("/", async (req, res) => {
  const products = await productService.getAll({
    limit: 100,
    page: 1,
    sort: "asc",
  });

  // Obtener o crear el carrito
  let carts = await cartService.getAll();
  if (!carts || carts.length === 0) {
    carts = [await cartService.create()];
  }
  const cartId = carts[0]._id;

  res.render("home", {
    title: "Bienvenido a la tienda",
    products: products.docs,
    cartId, //se lo pasamos a la vista para que el navbar pueda usarlo de una
  });
});

export default router;
