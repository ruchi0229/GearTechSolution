// get value for toggle
let logIn = document.querySelector("#login");
let signUp = document.querySelector("#signup");
let butnToggle = document.querySelector("#butn-div");
// signUp form
let email = document.querySelector("#signUp-email"); // input for email
let password = document.querySelector("#signUp-password"); // input for password
let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //regex for valid email address
// login form
let loginEmail = document.querySelector("#login-email"); //input for email
let loginPassword = document.querySelector("#login-paswd"); // input for password

// to add admins info in users array of objects
let admins = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "ExoticParts04",
  },
  {
    name: "AppAdmin",
    email: "exoticparts@gmail.com",
    password: "ExoticParts04",
  },
];

// add admin user into local storage
localStorage.setItem("users", JSON.stringify(admins));

//function for toggle button
function signup() {
  logIn.style.left = "-400px";
  signUp.style.left = "50px";
  butnToggle.style.left = "110px";
}
//function for toggle button
function login() {
  logIn.style.left = "50px";
  signUp.style.left = "-450px";
  butnToggle.style.left = "0px";
}

// Signup form validation

// name validation on blur
function checkfullname1() {
  let fullName = document.querySelector("#full-name"); // input for fullname
  let nameData = document.querySelector("#name-data"); //error span for full name
  let checkName = "^[a-zA-Z]+$"; //regex for valid fullname
  if (fullName.value == null || fullName.value.length < 1) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
    nameData.style.opacity = 1;
    return false;
  }
  if (!fullName.value.match(checkName)) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Name only include letters</span>';
    nameData.style.opacity = 1;
    return false;
  } else {
    nameData.style.opacity = 0;
    return true;
  }
}
// name validation on key up
function checkfullname2() {
  let fullName = document.querySelector("#full-name"); // input for fullname
  let nameData = document.querySelector("#name-data"); //error span for full name
  let checkName = "^[a-zA-Z]+$"; //regex for valid fullname
  if (fullName.value == "") {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
    nameData.style.opacity = 1;
    return false;
  }
  if (!fullName.value.match(checkName)) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Name only include letters</span>';
    nameData.style.opacity = 1;
    return false;
  }
  if (fullName.value.match(checkName)) {
    nameData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Name only include letters</span>';
    nameData.style.opacity = 0;
    return true;
  }
}

// email validation on blur
function checkemail1() {
  let emailData = document.querySelector("#email-data"); //error span for email
  if (email.value.length == "") {
    emailData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Please input this field</span>';
    emailData.style.opacity = 1;
    return false;
  }
  if (!email.value.match(mailformat)) {
    emailData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Enter a valid Email Address</span>';
    emailData.style.opacity = 1;
    return false;
  } else {
    return true;
  }
}
// email validation on key up
function checkemail2() {
  let emailData = document.querySelector("#email-data"); //error span for email
  if (email.value.length == "") {
    emailData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Please input this field</span>';
    emailData.style.opacity = 1;
    return false;
  }
  if (email.value.match(mailformat)) {
    emailData.style.opacity = 0;
    return true;
  } else {
    emailData.style.opacity = 0;
    return true;
  }
}

// password validation on blur
function checkpassword1() {
  let passwordFormat = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/; //regex for valid password
  let passwordData = document.querySelector("#paswd-data"); //password error span
  if (password.value.length == "") {
    passwordData.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Please input this field</span>';
    passwordData.style.opacity = 1;
    return false;
  }
  if (!password.value.match(passwordFormat)) {
    passwordData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Must contain atleast 8 characters,one letter and one number</span>';
    passwordData.style.opacity = 1;
    return false;
  } else {
    passwordData.style.opacity = 0;
    return true;
  }
}
// password validation on key up
function checkpassword2() {
  let passwordFormat = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/; //regex for valid password
  let passwordData = document.querySelector("#paswd-data"); //password error span
  if (password.value.length !== "") {
    passwordData.style.opacity = 0;
    return true;
  }
  if (password.value.match(passwordFormat)) {
    passwordData.style.opacity = 0;
    return true;
  }
}

// Validation for Confirm Password

// confirm  password validation on blur
function checkconfirmpassword1() {
  let confirmPassword = document.querySelector("#confirm-password"); // input for confirm password
  let confirmPasswordData = document.querySelector("#confirmPaswd-data"); // confirm password error span
  if (confirmPassword.value != password.value && confirmPassword.value !== "") {
    confirmPasswordData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Password not match</span>';
    confirmPasswordData.style.opacity = 1;
    return false;
  }
  if (confirmPassword.value == "") {
    confirmPasswordData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
    confirmPasswordData.style.opacity = 1;
    return false;
  }
  return true;
}
// confirm password  validation on key
function checkconfirmpassword2() {
  let confirmPassword = document.querySelector("#confirm-password"); // input for confirm password
  let confirmPasswordData = document.querySelector("#confirmPaswd-data"); // confirm password error span
  if (
    confirmPassword.value.length != "" &&
    confirmPassword.value == password.value
  ) {
    confirmPasswordData.style.opacity = 0;
    return true;
  } else {
    confirmPasswordData.style.opacity = 0;
  }
}

// clear signup
function clearData() {
  console.log(document.querySelector("#full-name"));
  document.querySelector("#full-name").value = "";
  document.getElementById("signUp-email").value = "";
  document.getElementById("signUp-password").value = "";
  document.getElementById("confirm-password").value = "";
}

function signUpButton() {
  let fullName = document.querySelector("#full-name").value;
  let email = document.querySelector("#signUp-email").value;
  let password = document.querySelector("#signUp-password").value;
  // let users = []; //all users array

  if (
    checkfullname1() &&
    checkfullname2() &&
    checkemail1() &&
    checkemail2() &&
    checkpassword1() &&
    checkpassword2() &&
    checkconfirmpassword1() &&
    checkconfirmpassword2()
  ) {
    // signup user data
    let user = {
      name: fullName,
      email: email,
      password: password,
    };

    /*
     * if users array is not setted then
     * add the previous users in users array,
     * after that add the new one
     */
    // if (localStorage.getItem("users") !== null) {
    //   // array of users from localStorage
    //   let previousUsers = JSON.parse(localStorage.getItem("users"));

    //   previousUsers.forEach(preUser => {
    //     /* if email already exist then
    //     replace the data with new one */
    //     if (preUser.email !== user.email) {
    //       users.push(preUser);
    //     }
    //   });
    // }

    // users.push(user); // add the current user

    // //set updated users into local storage
    // localStorage.setItem("users", JSON.stringify(users));


    clearData();
    window.location.assign("../html/form.html");
    return true
  } else {
    return false;
  }
}

// login form validation
// Email Validation

function loginEmailValidation1() {
  let loginEmaildata = document.querySelector("#loginemail-data"); // error span for email
  if (loginEmail.value.length == "") {
    loginEmaildata.innerHTML =
      '<i class="fas fa-exclamation-circle"><span> Please input this field</span>';
    loginEmaildata.style.opacity = 1;
    return false;
  }
  if (!loginEmail.value.match(mailformat)) {
    loginEmaildata.innerHTML =
      '<i class="fas fa-exclamation-circle"> <span>Enter a valid Email Address</span>';
    loginEmaildata.style.opacity = 1;
    return false;
  } else {
    loginEmaildata.style.opacity = 0;
    return true;
  }
}
function loginEmailValidation2() {
  let loginEmaildata = document.querySelector("#loginemail-data"); // error span for email
  if (loginEmail.value.length !== "") {
    loginEmaildata.style.opacity = 0;
    return true;
  }
  if (loginEmail.value.match(mailformat)) {
    loginEmaildata.style.opacity = 0;
    return true;
  }
}

//passwd validation

// on blur
function loginPasswordValidation1() {
  let loginPasswordData = document.querySelector("#loginpaswd-data"); //error span for password
  if (loginPassword.value.length == "") {
    loginPasswordData.innerHTML =
      '<i class="fas fa-exclamation-circle"><span>Please input this field</span>';
    loginPasswordData.style.opacity = 1;
    return false;
  } else {
    loginPasswordData.style.opacity = 0;
    return true;
  }
}
// on keyUp
function loginPasswordValidation2() {
  let loginPasswordData = document.querySelector("#loginpaswd-data"); //error span for password
  if (loginPassword.value != "") {
    loginPasswordData.style.opacity = 0;
    return true;
  }
}
// clear input fields in login
function clearLogin() {
  document.querySelector("#login-email").value = "";
  document.querySelector("#login-paswd").value = "";
}

function loginButton() {
  let btn = document.querySelector("#login-btn");
  let loginEmail = document.querySelector("#login-email");
  let loginPassword = document.querySelector("#login-paswd");
  let flag = false;
  let loggedInUser = {
    user_id: Date.now(),
    email: loginEmail.value,
  };

  /*
   * get the users array from local storage
   * and parse the string into JSON.
   */
  let users = JSON.parse(localStorage.getItem("users"));

  for (let i = 0; i < users.length; i++) {
    if (loginEmail.value == users[i].email) {
      if (loginPassword.value == users[i].password) {
        flag = true;
        break;
      } else {
        let loginPasswordData = document.querySelector("#loginpaswd-data");
        loginPasswordData.innerHTML =
          '<i class="fas fa-exclamation-circle">incorrect Password';
        loginPasswordData.style.opacity = 1;
        break;
      }
    } else {
      let loginEmaildata = document.querySelector("#loginemail-data");
      loginEmaildata.innerHTML =
        '<i class="fas fa-exclamation-circle">Incorrect Email';
      loginEmaildata.style.opacity = 1;
    }
  }
  if (
    flag &&
    loginEmailValidation1() &&
    loginEmailValidation2() &&
    loginPasswordValidation1() &&
    loginPasswordValidation2()
  ) {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    window.open("../index.html");
    clearLogin();
  } else {
    console.log("field is wrong ");
  }
}
