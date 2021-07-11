import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "../css/sass/main.scss";
import { showAlert } from "./alerts";
import cartView from "../js/views/cartView";
import userView from "../js/views/userView";
import bookingView from "../js/views/bookingView";
import formView from "../js/views/formView";
import navView from "../js/views/navView";
import * as model from "./model";


//Complete a checkout session
const controlCompletePayment = async function (customerInfo, data) {
  const stripe = Stripe(
    "pk_test_51J7lt6BzMjIOK0cYd9hrmA8TDUFvevXW0fNiVaKlFSNsJmZJhW6LKuQqKLZkKHKPQKf4C0ooLRUWuuB4qfk2Dmj900VI1maLkw"
  );

  formView.removeAlertStyle("input__class", "label-span","label__input"); 
  const answer = model.validateForms(data);

  if (!answer) {
    const formData = model.returnForm(data); 
    formView.addAlertStyle(formData); 
    return;
  }
    const email = customerInfo.email; 
  
    const validateEmail = model.validateEmail(email)

    if(!validateEmail){
      formView.addAlertStyle("email", ".label__email", ".span__email");
      return; 
    }
    
  try {
   
    const session = await axios({
      method: "POST",
      url: "/api/v1/booking/checkout-session",
      data: {
        customerInfo,
      },
     // withCredentials: true,
    });

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};


//Add item to cart
const controlAddToCart = async function (id, quantity) {
  try {
    const res = await axios({
      method: "POST",
      url: "/cart/add-to-cart",
      data: {
        id,
        quantity,
      },
    });

    location.assign("/shop/bag");
  } catch (err) {
    console.log(err.response.data.message);
  }
};

//Update cart item
const controlUpdateCartItem = async function (id, quantity) {
  try {
    const res = await axios({
      method: "POST",
      url: "/cart/update-item",
      data: {
        id,
        quantity,
      },
    });

    /*     $('#cart').load(window.location.href  +  ' #cart');
  $('#navCart').load(document.URL +  ' #navCart') */
    location.reload(true);
  } catch (err) {
    showAlert("error", "Cannot add item to cart, please try again later!");
  }
};

//Sign up a user
const controlUserSignUp = async function (formData) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/register",
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      },
    });

    if (res.data.status === "success") {

      showAlert("success", "Account created! Please login");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    showAlert("error",  "Something went wrong, please try again later");
  }
};


const controlForgotPassword =  async function(email, emailEl, labelEl, spanEl, resetContainer, resetMessage){

  console.log(email);
  
  if(!email) return; 


  const validateEmail = model.validateEmail(email)
  if(!validateEmail){
    formView.addEmailAlertStyle("emailPassword", ".reset__label", ".reset__email");
  }

  formView.addClassByElement(resetContainer, "hidden"); 
  formView.removeClassByElement(resetMessage); 

  try {
   
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/forgot-password",
      data: {
        email,
      },
     // withCredentials: true,
    });


  } catch (err) {
    showAlert("error", err.response.data.message);
  }

}

const controlResetPassword = async function(password, passwordConfirm){

  formView.removeAlertStyle("password__reset-input", "password__reset-span","password__reset-label"); 

  if(!password || !passwordConfirm) {
    formView.addAlertStyle("passwordReset", ".password__reset-label", ".password__reset-span", "Must enter both fields");
    return; 
  } 

  
  if (password !== passwordConfirm){

    formView.addAlertStyle("passwordReset", ".password__reset-label", ".password__reset-span", "Passwords do not match");

    return; 
  }

  if(password.length < 8){
    formView.addAlertStyle("passwordReset", ".password__reset-label", ".password__reset-span", "Password minimum length is 8 characters");
    return; 
  }


  const queryString = window.location.href.split("/").slice(-1).join(""); 


  try {
   
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/reset",
      data: {
        token: queryString,
        password,
        passwordConfirm,
      },
  
    });
    if (res.data.status === "success") {
      console.log("Im here");
      
      showAlert("success", "Password updated successfully!");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }

  } catch (err) {
    showAlert("error", err.response.data.message);
    
  }
}
//Display phone mask
function phoneMask() {
  var num = $(this).val().replace(/\D/g, "");
  $(this).val(
    num.substring(0, 1) +
      "(" +
      num.substring(1, 4) +
      ")" +
      num.substring(4, 7) +
      "-" +
      num.substring(7, 11)
  );
}
$('[type="tel"]').keyup(phoneMask);

const init = function () {
  cartView.addCartItemHandler(controlAddToCart);
  cartView.displayCart();
  cartView.removeCart();
  cartView.updateCartItem(controlUpdateCartItem);
  userView.addHandlerSignUpForm(controlUserSignUp);
  userView.addProfileHandler();
  userView.addForgotPasswordHandler(controlForgotPassword)
  userView.addResetPasswordKeyPressHandler(controlResetPassword); 
  userView.addResetPasswordClickHandler(controlResetPassword); 
  bookingView.addHandlerPaybtn(controlCompletePayment);
  navView.addRemoveLinksHandler(); 
  navView.displayMinNav(); 
  navView.addRemoveNavHandler(); 

};

init();
