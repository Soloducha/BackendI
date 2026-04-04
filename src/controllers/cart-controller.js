import { cartService } from "../services/cart-service.js";

class CartController {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res, next) => {
    try {
      const response = await this.service.getAll();
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getbyId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.service.getbyId(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const response = await this.service.create(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  addtoCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const response = await this.service.addtoCart(cid, pid, quantity);
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

export const cartController = new CartController(cartService);
