/*
 * function for setting the product quantity on cart icon
 */
function showQuantity() {
    let userCart = document.getElementById("user-cart");
  
    let totalQuantity = 0; //set initial quantity to 0
  
    // get all products ftom localStorage
    let cartCurrentProducts = JSON.parse(localStorage.getItem("products"));
  
    if (cartCurrentProducts !== null) {
      // loop through adding all products quantity
      cartCurrentProducts.forEach(cartCurrentProduct => {
        totalQuantity += cartCurrentProduct.product_quantity;
      });
    }
  
    userCart.onclick = function () {
      if (totalQuantity === 0) {
        swal("Your cart is currently empty!", "Please, select the item to see cart page.", "info");
      }
      else {
        userCart.href = "../html/user-cart.html";
      }
    };
  
    // setting the total quantity on UI - cart icon
    document.querySelector(".total-quantity").innerHTML = `<span>${totalQuantity}</span>`;
  }
  
  // set the quantity values on cart icon
  showQuantity();