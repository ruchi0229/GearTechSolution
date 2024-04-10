// pre loader
window.onload = function () {
  document.getElementById('loader').style.display = 'none';
}

/***
 set products in user cart page from localStorage
***/
function showCartProducts() {

  let cartProducts = []; //adding all localSctorage products into array
  let totalBill = 0; //set initial bill to 0
  let totalQuantity = 0;

  cartProducts = JSON.parse(localStorage.getItem("products"));

  /* sort cart items, so order 
     should always be same, when 
     edit / delete the items from cart
  */
  if (cartProducts !== null && cartProducts.length > 0) {
    cartProducts.sort((a, b) => {
      return a.product_id - b.product_id;
    });

    // set the table head when no products are in cart
    document.querySelector(".user-cart-head").innerHTML =
      `<tr>
         <th scope="col" class="border-0">
            <div class="p-2 px-3 text-uppercase">Product</div>
         </th>
         <th scope="col" class="border-0 price">
            <div class="py-2 text-uppercase">Price</div>
         </th>
         <th scope="col" class="border-0">
           <div class="py-2 text-uppercase">Quantity</div>
         </th>
       </tr>`;

    // set the array values in user cart table
    document.querySelector(".user-cart-table").innerHTML = cartProducts.map(product => {

      totalBill += product.total_price; //add - all cart products prices
      totalQuantity += product.product_quantity; //sum of all products quantity
      return `<tr>
                   <th scope="row" class="border-0">
                        <div class="p-2">
                            <img src="${product.product_image}" alt=""
                            width="70" class="img-fluid rounded shadow-sm">
                            <div class="ml-3 d-inline-block align-middle">
                                <h5 class="mb-0"> <a href="product_detail.html?p_id=${product.product_id}"
                                class="text-dark d-inline-block align-middle">${product.product_name}
                                </a></h5><span class="text-muted font-weight-normal font-italic d-block">
                                Category: ${product.category_name}</span>
                                <div class="price-sm"><strong>RS. ${product.product_price} x ${product.product_quantity}</strong></div>
                            </div>
                        </div>
                    </th>
                    <td class="border-0 align-middle price"><strong>RS. ${product.product_price} x ${product.product_quantity}</strong></td>
                    <td class="border-0 align-middle">
                        <div class="d-flex flex-lg-row">
                            <input type="button" class="sub-product edit-product" id="sub-${product.product_id}" value="-">
                            <input class="cart-edit product-quantity" type="text" name="quantity" id="quantity-${product.product_id}" value="${product.product_quantity}" disabled>
                            <input type="button" class="add-product edit-product" id="add-${product.product_id}" value="+">
                        </div>
                    </td>
                </tr>`;
    }).join('');

    //*** set the sub-total and total bill in order summary ***
    document.querySelector(".sub-total-bill").innerHTML = totalBill + " RS.";
    document.querySelector(".total-bill").innerHTML = totalBill + " RS.";

    //*** set the sub-total and total bill in checkout popup ***
    document.querySelector(".checkout-quantity").innerHTML = totalQuantity;
    document.querySelector(".checkout-total-bill").innerHTML = totalBill + " RS.";
    let discountBill = totalBill - ((totalBill * 10) / 100);    // calculating discount
    document.querySelector(".checkout-discount-bill").innerHTML = discountBill + " RS.";

    /********************* edit cart functionality ********************/

    // get all button of table
    let editProducts = document.querySelectorAll(".edit-product");

    for (let i = 0; i < editProducts.length; i++) {
      //for identify the event listner and call updateCart function
      editProducts[i].addEventListener('click', updateCart, false);
    }
  }
  else {
    // remove the order summary and personal data form wen no item at cart
    document.querySelector(".order-details").style.display = "none";

    // show cart empty msg with return o back option
    document.querySelector(".user-cart-table").innerHTML =
      `<div class="col-lg-12 d-flex justify-content-center">
          <div>
            <h5 class="my-2">Your cart is currently empty.</h5>
            <div class="d-flex justify-content-center">
                <a href="../index.html#shop-by-category" class="btn d-inline-block align-middle mt-2">RETURN TO SHOP</a>     
            </div>
          </div>
       </div>`;
  }

  // setting the total quantity on UI - cart icon
  document.querySelector(".total-quantity").innerHTML = `<span>${totalQuantity}</span>`;
}

/**
 * updating the quantity and price of product
 * and updating it on localStorage
**/
function updateCart() {

  // get all current products from localStorage
  let cartCurrentProducts = JSON.parse(localStorage.getItem("products"));

  let buttonType = this.id.slice(0, 3); //get the button id first string part
  let id = this.id.slice(4); //get button id integer part
  let totalPrice = 0;

  cartCurrentProducts.forEach((product, index) => {

    //selecting the clicked product quantity input from the cart list
    productQuantity = document.querySelector(`#quantity-${id}`);
    let quantity = parseInt(productQuantity.value);

    if (product.product_id == id) {

      if (buttonType === "add") { //check button is for adding products
        quantity++;
        productQuantity.value = quantity;
      }
      else if (buttonType === "sub") { //check button is for subtracting products
        if (quantity > 1) { //subbract if products are >1
          quantity--;
          productQuantity.value = quantity;
        }
        else { //else remove the product from cart and localStorage
          quantity--;

          // delete the object from current cart items when 0 quantity
          cartCurrentProducts.splice(index, 1);

          // set the updated products in local Stprage
          localStorage.setItem('products', JSON.stringify(cartCurrentProducts));

          // reflect the cart product changes in cart page
          showCartProducts();

          // enforce to remove the header of cart products table, when no items in cart
          if (cartCurrentProducts.length == 0) {
            document.querySelector(".user-cart-head").style.display = "none";
          }
        }
      }

      //update the localStorage if quantity >=1
      if (quantity >= 1) {

        //calculate total price
        totalPrice = quantity * product.product_price;

        let cartItems = []; // array of selected products by user

        let productJson = {
          product_id: product.product_id,
          category_name: product.category_name,
          product_name: product.product_name,
          product_description: product.product_description,
          product_image: product.product_image,
          product_quantity: parseInt(productQuantity.value),
          product_price: product.product_price,
          total_price: totalPrice
        };

        // get all current products from cart 
        let previousProducts = JSON.parse(localStorage.getItem("products"));

        previousProducts.forEach(preProduct => {

          /*
            add the items which are not
            edited in cart
          */
          if (preProduct.product_id !== productJson.product_id) {
            cartItems.push(preProduct);
          }
        });

        // add the edited cart item
        cartItems.push(productJson);

        // storing product detail in local storage with totalprice and quantity
        localStorage.setItem("products", JSON.stringify(cartItems));

        // reflect the cart product changes in cart page
        showCartProducts();
      }
    }
  });
}

/******************* Checkout Functioanlity ******************/

// place order Done button 
let clearLS = document.getElementById("done-btn");

// Delivery Time - usp fields
let checkoutbtn = document.getElementById("checkoutbtn");
let checkouttime = document.getElementById("checkout-time");
let deliverytime = document.getElementById("delivery-time");

// removing products from localstorage when confirm order
clearLS.addEventListener('click', function () {

  /* get all personal info fields 
   * to check if all shipment info is filled or not
   */
  const personalInfoFields = document.querySelectorAll(".personal-info-input");
  let isPersonalInfoFilled = true;

  /* if all shipment info is not filled 
   * then order should not be placed
   */
  for (let i = 0; i < personalInfoFields.length; i++) {
    if (personalInfoFields[i].value == "") {
      isPersonalInfoFilled = false; // if any one field is empty
    }
  }

  // remove products from local storage when fields are not empty
  if (isPersonalInfoFilled) {
    localStorage.removeItem("products");
  }
});

// show model with order details and usp 
checkoutbtn.addEventListener('click', () => {

  /* get all personal info fields 
   * to check if all shipment info is filled or not
   */
  const personalInfoFields = document.querySelectorAll(".personal-info-input");
  let isPersonalInfoFilled = true;

  for (let i = 0; i < personalInfoFields.length; i++) {

    // if any fiels is empty then show error msg on modal
    if (personalInfoFields[i].value == "") {
      document.querySelector(".cart-modal-title").innerHTML = "Please, fill out your shipment information before checkout!";
      isPersonalInfoFilled = false; // if any one field is empty
    }
  }

  // confirm order place msg, if all fields are filled
  if (isPersonalInfoFilled) {
    document.querySelector(".cart-modal-title").innerHTML = "Your order is about to be place!";
  }

  let today = new Date();

  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let date = today.getDate();

  let currentDate = `${date}/${month}/${year}`; // calculating today
  let tomorrowDate = `${date + 1}/${month}/${year}`;  //// calculating tomorrow

  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  let currentTime = `${hours}:${minutes}:${seconds}`;   // calculating current time

  checkouttime.innerText = currentDate + ' ' + currentTime;
  deliverytime.innerText = tomorrowDate + ' ' + currentTime;
});

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
      document.querySelector(".login-btn").href = "form.html";
    }
  };
}


// form validation
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      checkoutbtn.addEventListener('click', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


/******************** Functions Call *******************/

// check login / logout status
loginStatus();

// function call to set products on user cart page
showCartProducts();








