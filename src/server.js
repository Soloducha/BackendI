import express from "express";
import { cartManager } from "./managers/cart-manager.js";
import { productManager } from "./managers/product-manager.js";

const app = express();
const PORT = 8080;

app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios

// Rutas para products//
//listo los productos
app.get("/api/products", async (req, res) => {
  return res.json(await productManager.getProducts());
});

//listo un producto por su id
app.get("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  return res.json(await productManager.getProductById(pid));
});

//creo un nuevo producto
app.post("/api/products", async (req, res) => {
  const response = await productManager.addProduct(req.body);
  res.json(response);
});

//elimino un producto por su id
app.delete("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const response = await productManager.deleteProduct(pid);
  if (response) {
    res.json({ message: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

//actualizo un producto por id poniendo en el body los campos a modificar
app.put("/api/products/:pid", async (req, res) => {
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

//Rutas para Carts//
//listo todos los carts
app.get("/api/carts", async (req, res) => {
  return res.json(await cartManager.getCarts());
});

//listo un cart por su id
app.get("/api/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  return res.json(await cartManager.getCartById(cid));
});

//creo un nuevo cart
app.post("/api/carts", async (req, res) => {
  const response = await cartManager.addCart();
  res.json(response);
});

//agrego un producto a un cart
app.post("/api/carts/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const response = await cartManager.addtoCart(cid, pid);
  if (response) {
    res.json(response);
  } else {
    res.status(404).json({ message: "Carrito o producto no encontrado" });
  }
});

// Inicia el servidor
app.listen(PORT, () =>
  console.log(`Servidor localhost:8080/ iniciado en el puerto ${PORT}`),
);

//👌
