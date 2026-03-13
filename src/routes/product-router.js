import { Router } from "express";
import { productManager } from "../managers/product-manager.js";

const router = Router();

// Rutas para products '/api/products' //
//listo los productos
router.get("/", async (req, res) => {
  return res.json(await productManager.getProducts());
});

//listo un producto por su id
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  return res.json(await productManager.getProductById(pid));
});

//creo un nuevo producto
router.post("/", async (req, res) => {
  const response = await productManager.addProduct(req.body);
  res.json(response);
});

//elimino un producto por su id
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const response = await productManager.deleteProduct(pid);
  if (response) {
    res.json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

//actualizo un producto por id poniendo en el body los campos a modificar
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const response = await productManager.updateProduct(pid, req.body);
  if (response) {
    res.json(response);
  } else {
    res
      .status(404)
      .json({ message: "Producto no encontrado o no actualizado" });
  }
});

export default router;
