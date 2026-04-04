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

// Ruta para ver detalle de un producto
// router.get("/products/:pid", async (req, res) => {
//   try {
//     const product = await productService.getbyId(req.params.pid);
//     res.render("product-detail", {
//       title: product.title,
//       code: product.code,
//       price: product.price,
//       description: product.description,
//       category: product.category,
//       thumbnail: product.thumbnail,
//       stock: product.stock,
//       status: product.status,
//       _id: product._id,
//     });
//   } catch (error) {
//     res.status(404).render("error", { error: "Producto no encontrado" });
//   }
// });

router.get("/cart", (req, res) => {
  const carts = cartService.getAll();
  res.render("cart", {
    title: "Carrito de compras",
    carts: carts.docs,
  });
});

export default router;
