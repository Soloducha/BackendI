import dotenv from "dotenv";
dotenv.config();

import { connect } from "mongoose";
import { productModel } from "./src/models/product-model.js";

async function testDB() {
  try {
    await connect(process.env.MONGO_URI2);
    const products = await productModel.find({});
    console.log("Productos encontrados:", products);
    if (products.length === 0) {
      console.log("No hay productos en la base de datos.");
    }
    process.exit(0);
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    process.exit(1);
  }
}

testDB();
