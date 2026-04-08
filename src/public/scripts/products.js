document.querySelectorAll(".btn-add-quick").forEach((btn) => {
  btn.addEventListener("click", async function () {
    const productId = this.dataset.productId;
    const stock = parseInt(this.dataset.productStock) || 1;
    const qtyInput = this.closest(".add-to-cart-inline").querySelector(
      ".qty-input",
    );
    const quantity = parseInt(qtyInput.value);

    if (!quantity || quantity < 1) {
      alert("Por favor indicá una cantidad válida");
      return;
    }
    if (quantity > stock) {
      alert(`Stock disponible: ${stock}`);
      return;
    }

    try {
      const cartId = "{{cartId}}" || localStorage.getItem("cartId");

      const addResponse = await fetch(
        `/api/carts/${cartId}/product/${productId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity }),
        },
      );

      if (addResponse.ok) {
        alert("¡Producto agregado al carrito!");
        qtyInput.value = 1;
      } else {
        const error = await addResponse.json();
        alert("Error: " + (error.message || "No se pudo agregar el producto"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el producto al carrito");
    }
  });
});
