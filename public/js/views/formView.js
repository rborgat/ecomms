class FormView {
  addAlertsStyle(data) {
    const elementsArr = [];
    data.forEach((arr) => {
      const [...input] = document.getElementsByName(arr[0]);
      const inputEl = input[0];
      const label = input[0].parentElement.firstElementChild;
      const span = label.firstElementChild;

      if (inputEl) {
        this.addBorderColor(inputEl, "#eb4d4b");
      }

      if (span || label) {
        this.removeClassByElement(span);
        this.addClassByElement(label, "text-alert");
      }
    });
  }

  removeClassByElement(el) {
    el.classList.remove("hidden");
  }
  addBorderColor(inputEl, color) {
    inputEl.style.borderColor = color;
  }
  addClassByElement(el, className) {
    el.classList.add(className);
  }
  removeAlertStyle(inputClassName, labelSpanClassName, labelClassName) {

    document.querySelectorAll(`.${inputClassName}`)?.forEach((el) => {
      el.style.borderColor = "";
    });
    document.querySelectorAll(`.${labelSpanClassName}`)?.forEach((el) => {
      el.classList.add("hidden");
      el.textContent = "can't be empty";
    });

    document.querySelectorAll(`.${labelClassName}`)?.forEach((el) => {
      el.classList.remove("text-alert");
    });
  }
  addAlertStyle(inputId, labelClass, spanClass, content = "Wrong Format") {
    const input = document.getElementById(inputId);
    const label = document.querySelector(labelClass);
    const span = document.querySelector(spanClass);

      console.log(labelClass)
      console.log("aldkadsk"); 
      
    //label.classList.add("text-alert");
    input.style.borderColor = "#eb4d4b";
    span.textContent = content; 
    span.classList.remove("hidden");
  }
}

export default new FormView();
