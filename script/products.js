// Pre Loader
window.onload = function () {
    document.getElementById('loader').style.display = 'none';
}

// get the category and sub category id from url
let getUrlParams = function (url) {
    let params = {};
    (url + '?').split('?')[1].split('&').forEach(
        function (pair) {
            pair = (pair + '=').split('=').map(decodeURIComponent);
            if (pair[0].length) {
                params[pair[0]] = pair[1];
            }
        });

    return params;
};

// asynchronous function to get fetch products from JSON
async function getProducts() {

    let products;
    let hasNavigationBar = false;
    // get the id's
    let params = getUrlParams(window.location.href);
    let id = params.id; // main category id 
    let cid = params.c_id // sub-category id
    // fetch the data from local json file
    // ***NOTE: Live Server Extension should be 
    // installed for fetching local JSON.
    const response = await fetch("../assets/JSON/exotic-parts.json");
    //convert the response in JSON format
    const categories = await response.json();

    categories.forEach(category => {

        // get sub categories array from each category
        let sub_categories = category.autoSubPart;

        sub_categories.forEach(sub_cat => {
            // console.log("subcat: " + sub_cat.c_id);
            if (category.id == id && sub_cat.c_id == cid) {
                // console.log(category.id + " ---- " + sub_cat.c_id);
                products = sub_cat.products;
                // console.log(products);

                // set the navigation bar towards the category
                document.querySelector(".product-navigation").innerHTML = products.map(product => {
                    if (!hasNavigationBar) {
                        hasNavigationBar = true;
                        return `
                              <p><b> <a href="../index.html">Home</a> / <a href="../index.html#${category.id}"> ${category.autoPart} </a> / ${sub_cat.name} </b></p>
                              <hr>`;
                    }
                }).join('');

                // set the products information into the UI 
                document.querySelector(".products-container").innerHTML = products.map(product => {
                    return `
                        <div class="col-md-4">
                            <div class="product-top">
                               <a href="product_detail.html?p_id=${product.p_id}"><img src=${product.url1}></a>
                               <div class="overlay">
                                   <a href="product_detail.html?p_id=${product.p_id}" class="btn btn-secondary" title="Quick View"><i class="far fa-eye"></i></a>
                                </div>    
                            </div>
                            <div class="product-bottom text-center">
                                 <h4 class="product-name">${product.name}</h4>
                                 <p class="sec-product-price">${product.price} RS.</p>
                            </div>
                        </div>`;
                }).join('');

            }
            else {
                console.log("Category or Sub Category Id's doesn't Match!");
            }
        });

    });
}

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
            userCart.href = "user-cart.html";
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
            document.querySelector(".login-btn").href = "form.html";
        }
    };
}

// check login / logout status
loginStatus();


//function calling - get products
getProducts();

// set the quantity values on cart icon
showQuantity();
