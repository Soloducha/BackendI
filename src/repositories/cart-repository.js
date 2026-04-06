import { cartModel } from "../models/cart-model.js";

class CartRepository {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => {
    try {
      return await this.model.find().populate("products.product");
    } catch (error) {
      throw new Error(`Error al obtener los carritos: ${error.message}`);
    }
  };

  getbyId = async (id) => {
    try {
      return await this.model.findById(id).populate("products.product");
    } catch (error) {
      throw new Error(`Error al obtener el carrito por ID: ${error.message}`);
    }
  };

  create = async () => {
    try {
      return await this.model.create({ products: [] });
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  };

  addtoCart = async (cartId, productId, quantity = 1) => {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID ${cartId} no encontrado`);
      }
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId,
      );
      if (productIndex === -1) {
        cart.products.push({
          product: productId,
          quantity: parseInt(quantity),
        });
      } else {
        cart.products[productIndex].quantity += parseInt(quantity);
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  };

  removeFromCart = async (cartId, productId) => {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID ${cartId} no encontrado`);
      }
      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId,
      );
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(
        `Error al eliminar producto del carrito: ${error.message}`,
      );
    }
  };

  updateQuantity = async (cartId, productId, quantity) => {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID ${cartId} no encontrado`);
      }
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId,
      );
      if (productIndex === -1) {
        throw new Error(`Producto no encontrado en el carrito`);
      }
      cart.products[productIndex].quantity = Math.max(1, parseInt(quantity));
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar cantidad: ${error.message}`);
    }
  };

  delete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el carrito: ${error.message}`);
    }
  };
}

export const cartRepository = new CartRepository(cartModel);
