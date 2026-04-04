import { productRepository } from "../repositories/product-repository.js";

class ProductService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async ({ limit = 10, page = 1, sort, query }) => {
    const filter = query ? { category: query } : {};
    const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};

    return await this.repository.getAll(filter, {
      limit,
      page,
      sort: sortOption,
      lean: true,
    });
  };

  getAllwithoutPagination = async () => {
    try {
      return await this.repository.getAll({}, { lean: true });
    } catch (error) {
      throw error;
    }
  };

  getbyId = async (id) => {
    try {
      const response = await this.repository.getbyId(id);
      if (!response) throw new Error(`Producto con ID ${id} no encontrado`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const response = await this.repository.create(body);
      if (!response) throw new Error(`No se pudo crear el producto`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const response = await this.repository.update(id, body);
      if (!response)
        throw new Error(`Producto con ID ${id} no encontrado o no actualizado`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const response = await this.repository.delete(id);
      if (!response) throw new Error(`Producto con ID ${id} no encontrado`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const productService = new ProductService(productRepository);
