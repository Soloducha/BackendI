import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async () => {
    // listar todos los productos de la base de datos
    try {
      if (fs.existsSync(this.path)) {
        //
        const productFile = await fs.promises.readFile(this.path, "utf-8"); // Lee el archivo de productos
        return JSON.parse(productFile);
      } else {
        return []; // Si el archivo no existe, devuelve un array vacío para evitar errores al intentar leerlo.
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  };

  getProductById = async (id) => {
    // traer solo el producto con el id proporcionado
    try {
      const products = await this.getProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      return null;
    }
  };

  addProduct = async (product) => {
    //agregar un nuevo producto
    try {
      const products = await this.getProducts();
      const newProduct = { id: uuidv4(), ...product };
      products.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2)); //2 de indetacion
      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      return null;
    }
  };

  // actualizar un producto por los campos enviados desde el body
  updateProduct = async (id, updatedFields) => {
    try {
      const products = await this.getProducts();
      const productIdx = products.findIndex((product) => product.id === id);
      if (productIdx === -1) {
        return null;
      } // Si no se encuentra el producto, devuelve null
      const updatedProduct = {
        ...products[productIdx],
        ...updatedFields,
        id: products[productIdx].id,
      }; // Mantiene el mismo ID
      products[productIdx] = updatedProduct;
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return updatedProduct;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return null;
    }
  };

  // eliminar el producto con el pid indicado
  deleteProduct = async (id) => {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        return null; // Si no se encuentra el producto, devuelve null
      }
      products.splice(productIndex, 1); // Elimina el producto del array
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
      return true; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return false;
    }
  };
}

export const productManager = new ProductManager("./products.json"); // Exporta una instancia de ProductManager con la ruta del archivo de productos.

//👌
