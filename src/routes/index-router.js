import { Router } from "express";
import productRouter from "./product-router.js";
import cartRouter from "./cart-router.js";
import viewsRouter from "./views-router.js";

const router = Router();

router.use("/products", productRouter); // Rutas para productos
router.use("/carts", cartRouter); // Rutas para carritos
router.use("/", viewsRouter); // Rutas para la vista principal

export default router;
