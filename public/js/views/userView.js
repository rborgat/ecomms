class UserView {
  signForm = document.querySelector(".sign");
  userNameBox = document.querySelector(".nav__el-profile");
  resetBtn = document.querySelector(".btn-reset");
  passwordResBtn = document.querySelector(".btn-password-reset");

  constructor() {}

  addHandlerSignUpForm(handler) {
    this.signForm?.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const dataObj = Object.fromEntries(data);

      handler(dataObj);
    });
  }
  addProfileHandler() {
    this.userNameBox?.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(".profile").classList.toggle("hidden");
    });
  }

  addForgotPasswordHandler(handler) {
    this.resetBtn?.addEventListener("click", function (e) {

        console.log("adadads")
      const emailEl = document.getElementById("emailPassword");
      const labelEl = document.querySelector(".reset__label");
      const spanEl = document.querySelector(".reset-span");
      const resetContainer = document.querySelector(".reset__container");
      const resetMessage = document.querySelector(".reset__message");

      const email = emailEl.value;

      handler(email, emailEl, labelEl, spanEl, resetContainer, resetMessage);
    });
  }

  getPasswordValues() {
    const password = document.getElementById("passwordReset").value;
    const passwordConfirm = document.getElementById(
      "confirmPasswordReset"
    ).value;

    return {
      password,
      passwordConfirm,
    };
  }
  addResetPasswordKeyPressHandler(handler) {
    document
      .querySelector(".main__password")
      ?.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
          const obj = this.getPasswordValues();

          handler(obj.password, obj.passwordConfirm);
        }
      });
  }
  addResetPasswordClickHandler(handler) {
    this.passwordResBtn?.addEventListener("click", (e) => {
      const obj = this.getPasswordValues();

      handler(obj.password, obj.passwordConfirm);
    });
  }
 
}

export default new UserView();
