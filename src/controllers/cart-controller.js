import { cartService } from "../services/cart-service.js";

class CartController {
  constructor(service) {
    this.service = service;
  }
  getAll = async (req, res, next) => {
    try {
      // Obtener el ID del carrito de la sesión o cookies

      // Por ahora, obtenemos el primer carrito disponible
      const carts = await cartService.getAll();
      if (!carts || carts.length === 0) {
        res.json("");
      } else {
        res.json(carts);
      }
    } catch (error) {
      next(error);
    }
  };

  getbyId = async (req, res, next) => {
    try {
      const { cid } = req.params;
      const response = await this.service.getbyId(cid);

      const cartItems = response.products.map((item) => ({
        id: item.product._id,
        name: item.product.title,
        price: item.product.price,
        image: item.product.thumbnails,
        quantity: item.quantity,
      }));

      res.render("cart", {
        title: "Carrito de compras",
        cartItems: cartItems,
        cartId: response._id,
      });
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

      const cart = await this.service.getbyId(cid);
      if (!cart) {
        await this.service.create();
      }

      const response = await this.service.addtoCart(cid, pid, quantity);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  removeFromCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const response = await this.service.removeFromCart(cid, pid);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  updateQuantity = async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const response = await this.service.updateQuantity(cid, pid, quantity);
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
