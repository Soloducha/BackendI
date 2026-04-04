import { productService } from "../services/product-service.js";

class ProductController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const products = await productService.getAll({
        limit: req.query.limit || 10,
        page: req.query.page || 1,
        sort: req.query.sort || "asc",
        query: req.query.query || "",
      });
      const currentSort = req.query.sort || "asc";
      const currentLimit = parseInt(req.query.limit) || 10;
      const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
      const params = new URLSearchParams({
        limit: currentLimit.toString(),
        sort: currentSort.toString(),
      });
      let urlnext = null;
      let urlprev = null;

      if (products.hasNextPage) {
        const nextParams = new URLSearchParams(params);
        nextParams.set("page", products.nextPage.toString());
        urlnext = `${baseUrl}api/products?${nextParams.toString()}`;
      }

      if (products.hasPrevPage) {
        const prevParams = new URLSearchParams(params);
        prevParams.set("page", products.prevPage.toString());
        urlprev = `${baseUrl}api/products?${prevParams.toString()}`;
      }
      console.log("pagina:", products.page);
      res.render("products", {
        title: "Productos",
        products: products.docs,
        totalPages: products.totalPages,
        currentPage: products.page,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        nextPage: urlnext,
        prevPage: urlprev,
        currentLimit: currentLimit,
        currentSort: currentSort,
      });
    } catch (error) {
      next(error);
    }
  };

  getbyId = async (req, res, next) => {
    try {
      const product = await productService.getbyId(req.params.pid);
      console.log("Producto obtenido en Controller:", product);
      res.render("product-detail", {
        title: product.title,
        code: product.code,
        price: product.price,
        description: product.description,
        category: product.category,
        thumbnail: product.thumbnail,
        stock: product.stock,
        status: product.status,
        _id: product._id,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const response = await this.service.create(id, body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const response = await this.service.update(id, body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productService);
