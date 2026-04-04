import { cartRepository } from "../repositories/cart-repository.js";

class CartService {
  constructor(repository) {
    this.repository = repository;
  }
  getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw error;
    }
  };

  getbyId = async (id) => {
    try {
      const response = await this.repository.getbyId(id);
      if (!response) throw new Error(`Carrito con ID ${id} no encontrado`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  create = async () => {
    try {
      const response = await this.repository.create();
      if (!response) throw new Error(`No se pudo crear el carrito`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  addtoCart = async (cartId, productId, quantity = 1) => {
    try {
      const response = await this.repository.addtoCart(cartId, productId, quantity);
      if (!response)
        throw new Error(`No se pudo agregar el producto al carrito`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const response = await this.repository.delete(id);
      if (!response) throw new Error(`Carrito con ID ${id} no encontrado`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const cartService = new CartService(cartRepository);
