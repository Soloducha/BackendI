import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import apiRouter from "./routes/index-router.js";
import viewsRouter from "./routes/views-router.js";
import { productManager } from "./managers/product-manager.js";

const app = express();
const PORT = 8080;

app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios
app.use(express.static(`${process.cwd()}/src/public`)); // Para servir archivos estáticos

app.use("/api", apiRouter); // Rutas para la vista principal
app.use("/", viewsRouter); // Rutas para la vista principal

// Configuración de Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${process.cwd()}/src/views`);
app.set("view engine", "handlebars");

// Inicia el servidor HTTP
const serverHttp = app.listen(PORT, () =>
  console.log(`Servidor localhost:8080/ iniciado en el puerto ${PORT}`),
);

// Inicia el servidor de Socket.IO
const socketServer = new Server(serverHttp);

socketServer.on("connection", (socket) => {
  productManager.getProducts().then((products) => {
    socket.emit("updateProducts", products); // Emitir la lista de productos al cliente recién conectado
  });

  console.log(`Nuevo cliente conectado; ID: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Cliente desconectado; ID:, ${socket.id}`);
  });

  socket.on("addProduct", async (newProduct) => {
    await productManager.addProduct(newProduct);
    const updatedProducts = await productManager.getProducts();
    socketServer.emit("updateProducts", updatedProducts); // Emitir la lista actualizada a todos los clientes
  });

  socket.on("deleteProduct", async (productCode) => {
    await productManager.deleteProductByCode(productCode);
    const updatedProducts = await productManager.getProducts();
    socketServer.emit("updateProducts", updatedProducts); // Emitir la lista actualizada a todos los clientes
  });

  socketServer.on("error", (error) => {
    console.error("Error en el servidor de Socket.IO:", error);
  });
});
//👌
