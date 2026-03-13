const socketClient = io();

const form = document.getElementById("form");
const formDelete = document.getElementById("formDelete");

//variables del input del formulario de Eliminar Producto
const deleteCodeInput = document.getElementById("deleteCode");

//variables de los inputs del formulario de Nuevo Producto
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const codeInput = document.getElementById("code");
const stockInput = document.getElementById("stock");
const statusInput = document.getElementById("status");
const categoryInput = document.getElementById("category");
// Contenedor para mostrar los productos
const productsContainer = document.getElementById("products");

socketClient.on("updateProducts", (products) => {
  //console.log("Productos actualizados:", products);
  // Actualizar la interfaz de usuario con los nuevos productos.
  productsContainer.innerHTML = ""; // Limpiar la lista actual
  let listItem = "";
  products.forEach((product) => {
    listItem += `${product.title} - ${product.description} - $${product.price}<br>Code: ${product.code} Stock: ${product.stock} Active: ${product.status} Category: ${product.category}<br><br>`;
  });
  productsContainer.innerHTML = listItem; // Agregar los nuevos productos a la interfaz
});

form.onsubmit = (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
  const newProduct = {
    title: titleInput.value,
    description: descriptionInput.value,
    price: parseFloat(priceInput.value),
    code: codeInput.value,
    stock: parseInt(stockInput.value),
    status: statusInput.checked,
    category: categoryInput.value,
  };
  socketClient.emit("addProduct", newProduct);
  // Limpiar los campos del formulario después de enviar
  titleInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  codeInput.value = "";
  stockInput.value = "";
  statusInput.checked = false;
  categoryInput.value = "";
};

formDelete.onsubmit = (event) => {
  event.preventDefault();
  const productCodeToDelete = deleteCodeInput.value;
  socketClient.emit("deleteProduct", productCodeToDelete);
  deleteCodeInput.value = ""; // Limpiar el campo después de enviar
};

socketClient.on("error", (error) => {
  console.error("Error en el cliente de Socket.IO:", error);
});
