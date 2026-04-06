const cartId = document.getElementById("cart-data").dataset.cartId;

function recalculateTotals() {
  const items = [];
  document.querySelectorAll(".qty-input").forEach((input) => {
    const row = input.closest(".cart-card");
    const priceText = row
      .querySelector(".cart-card__price")
      .textContent.replace("$", "");
    const price = parseFloat(priceText);
    const quantity = parseInt(input.value);
    items.push({ price, quantity });

    const subtotalVal = row.querySelector(".cart-card__subtotal-value");
    subtotalVal.textContent = "$" + (price * quantity).toFixed(2);
  });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.21;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("tax").textContent = "$" + tax.toFixed(2);
  document.getElementById("total").textContent = "$" + total.toFixed(2);
}

document.querySelectorAll(".remove-item").forEach((btn) => {
  btn.addEventListener("click", async function () {
    const productId = this.getAttribute("data-id");
    if (confirm("Eliminar este producto del carrito?")) {
      try {
        const response = await fetch(
          `/api/carts/${cartId}/product/${productId}`,
          { method: "DELETE" },
        );
        if (response.ok) {
          this.closest(".cart-card").remove();
          recalculateTotals();
          if (document.querySelectorAll(".cart-card").length === 0) {
            setTimeout(() => location.reload(), 400);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al eliminar el producto");
      }
    }
  });
});

document.querySelectorAll(".update-qty").forEach((btn) => {
  btn.addEventListener("click", async function () {
    const productId = this.getAttribute("data-id");
    const action = this.getAttribute("data-qty");
    const qtyInput = document.querySelector(
      `.qty-input[data-id="${productId}"]`,
    );
    let newQuantity = parseInt(qtyInput.value);

    if (action === "increase") newQuantity++;
    else if (action === "decrease") newQuantity = Math.max(1, newQuantity - 1);

    try {
      const response = await fetch(
        `/api/carts/${cartId}/product/${productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        },
      );
      if (response.ok) {
        qtyInput.value = newQuantity;
        recalculateTotals();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar la cantidad");
    }
  });
});
