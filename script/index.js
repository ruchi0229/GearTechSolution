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
      userCart.href = "html/user-cart.html";
    }
  };

  // setting the total quantity on UI - cart icon
  document.querySelector(".total-quantity").innerHTML = `<span>${totalQuantity}</span>`;
}

// function to check if user is login or not
function loginStatus() {

  // get login/signin anchor tag 
  const login = document.getElementById("loggedIn");

  // get loggedin user from local storage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  //if user is login then change the text into logout
  if (user !== null) {
    login.innerHTML = "Logout";
  }
  else {
    login.innerHTML = "Login / Sign Up";
  }

  /* 
   * logout the user from website when logout button is clicked
   * otherwise redirect the user to login/signup form
   */
  document.querySelector(".login-btn").onclick = function () {

    // if user already login
    if (login.innerHTML == "Logout") {
      localStorage.removeItem("loggedInUser");

      // show sweet alert message to user about logout
      swal("Logging Out...", "Your account will be logged out!", "success");
      loginStatus(); //reflect the ui after logout
    }
    else {
      document.querySelector(".login-btn").href = "html/form.html";
    }
  };
}

// set the quantity values on cart icon
showQuantity();

// check login / logout status
loginStatus();