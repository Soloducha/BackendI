import express from "express";
import handlebars from "express-handlebars";
import apiRouter from "./routes/index-router.js";
import viewsRouter from "./routes/views-router.js";
import { connectDB } from "./config/db-connection.js";
import { productService } from "./services/product-service.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios
app.use(express.static(`${process.cwd()}/src/public`)); // Para servir archivos estáticos

app.use("/api", apiRouter); // Rutas para la vista principal
app.use("/", viewsRouter); // Rutas para la vista principal

// Configuración de Handlebars con helpers personalizados
const hbsInstance = handlebars.create({
  helpers: {
    // Helper para generar rango de números
    range: (start, end) => {
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    },
    // Helper para comparar igualdad
    ifEqual: function (a, b, options) {
      if (a == b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    // Helper para multiplicar
    multiply: (a, b) => {
      return (a * b).toFixed(2);
    },
    // Helper para calcular subtotal en cart
    subtotal: (items) => {
      if (!items || items.length === 0) return "0.00";
      const total = items.reduce((sum, item) => {
        const price = item.product?.price || item.price || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0);
      return total.toFixed(2);
    },
    // Helper para calcular impuestos (21% por defecto) en cart
    tax: (items) => {
      if (!items || items.length === 0) return "0.00";
      const subtotal = items.reduce((sum, item) => {
        const price = item.product?.price || item.price || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0);
      const tax = subtotal * 0.21;
      return tax.toFixed(2);
    },
    // Helper para calcular total en cart
    total: (items) => {
      if (!items || items.length === 0) return "0.00";
      const subtotal = items.reduce((sum, item) => {
        const price = item.product?.price || item.price || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0);
      const tax = subtotal * 0.21;
      const shipping = subtotal >= 5000 ? 0 : 300;
      const total = subtotal + tax + shipping;
      return total.toFixed(2);
    },
  },
});

app.engine("handlebars", hbsInstance.engine);
app.set("views", `${process.cwd()}/src/views`);
app.set("view engine", "handlebars");

// Conexión a la base de datos
await connectDB() //esperamos a que se conecte a la base de datos antes de iniciar el servidor
  .then(() => console.log("Conexión a la base de datos exitosa"))
  .catch((error) =>
    console.error("Error al conectar a la base de datos:", error),
  );

// Inicia el servidor HTTP
const serverHttp = app.listen(PORT, () =>
  console.log(`Servidor localhost:8080/ iniciado en el puerto ${PORT}`),
);
