import axios from "axios";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "../css/sass/main.scss";
import { showAlert } from "./alerts";
import cartView from "../js/views/cartView";
import userView from "../js/views/userView";
import bookingView from "../js/views/bookingView";
import * as model from "./model";

const controlCompletePayment = async function (customerInfo, data) {
  const stripe = Stripe(
    "pk_test_51J7lt6BzMjIOK0cYd9hrmA8TDUFvevXW0fNiVaKlFSNsJmZJhW6LKuQqKLZkKHKPQKf4C0ooLRUWuuB4qfk2Dmj900VI1maLkw"
  );

  try {
    const answer = model.validateForms(data);

    if (!answer) {
      showAlert("error", "Please fill out the form completely");
      return;
    }

    const session = await axios({
      method: "POST",
      url: "/api/v1/booking/checkout-session",
      data: {
        customerInfo,
      },
      withCredentials: true,
    });

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert("error", err);
  }
};

const controlAddToCart = async function (id, quantity) {
  try {
    const res = await axios({
      method: "POST",
      url: "/add-to-cart",
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
const controlUpdateCartItem = async function (id, quantity) {
  try {
    const res = await axios({
      method: "POST",
      url: "/update-item",
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

const controlUserSignUp = async function (formData) {
  try {
    const res = await axios({
      method: "POST",
      url: "/account/register",
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
    showAlert("error", "Error creating acccount! Try again");
  }
};
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
  bookingView.addHandlerPaybtn(controlCompletePayment);
};

init();
