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
    // Helper para truncar texto
    truncate: (text, length) => {
      if (!text) return "";
      text = text.toString();
      if (text.length > length) {
        return text.substring(0, length) + "...";
      }
      return text;
    },
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
