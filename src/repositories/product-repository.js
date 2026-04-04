import { productModel } from "../models/product-model.js";

class ProductRepository {
  constructor(model) {
    this.model = model;
  }

  getAll = async (filter = {}, options = {}) => {
    try {
      const products = await this.model.paginate(filter, options);
      return products;
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  };

  getbyId = async (id) => {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  };

  create = async (body) => {
    try {
      return await this.model.create(body);
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  };

  update = async (id, body) => {
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

  delete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  };
}

export const productRepository = new ProductRepository(productModel);
