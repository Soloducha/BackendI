import { Router } from "express";

import { productController } from "../controllers/product-controller.js";

const router = Router();

// Rutas para products '/api/products' //
//listo los productos
router.get("/", productController.getAll);

//listo un producto por su id
router.get("/:pid", productController.getbyId);

//creo un nuevo producto
router.post("/", productController.create);

//elimino un producto por su id
router.delete("/:pid", productController.delete);

//actualizo un producto por id poniendo en el body los campos a modificar
router.put("/:pid", productController.update);

export default router;
