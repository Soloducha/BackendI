import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { productManager } from "./product-manager.js";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const cartFile = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(cartFile);
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      return carts.find((cart) => cart.id === id);
    } catch (error) {
      console.error("Error al obtener el carrito por ID:", error);
      return null;
    }
  };

  addCart = async () => {
    try {
      const carts = await this.getCarts();
      const newCart = { id: uuidv4(), products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (error) {
      console.error("Error al agregar el carrito:", error);
      return null;
    }
  };

  addtoCart = async (cartId, productId) => {
    try {
      const carts = await this.getCarts();
      const products = await productManager.getProducts();
      const productExists = products.findIndex(
        (product) => product.id === productId,
      );
      const cartIdx = carts.findIndex((cart) => cart.id === cartId);
      if (cartIdx === -1 || productExists === -1) {
        return null; // Carrito o producto no encontrado
      }
      const productIdx = carts[cartIdx].products.findIndex(
        (product) => product.id === productId,
      );
      if (productIdx === -1) {
        carts[cartIdx].products.push({ id: productId, quantity: 1 });
      } else {
        carts[cartIdx].products[productIdx].quantity += 1;
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return carts[cartIdx];
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      return null;
    }
  };
}

export const cartManager = new CartManager("./carts.json");

//👌
