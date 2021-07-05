class FormView {

    addAlertStyle(data) {
        const elementsArr = [];
        data.forEach(arr => {
          const [...input] = document.getElementsByName(arr[0]);
          const inputEl = input[0];
          const label = input[0].parentElement.firstElementChild;
          const span = label.firstElementChild;

         if(inputEl){
             inputEl.style.borderColor = "#eb4d4b"; 
         }
    
          if (span || label) {
            span.classList.remove("hidden"); 
            label.classList.add("text-alert")
          }
        });
      }
      removeAlertStyle(){
        document.querySelectorAll(".input__class")?.forEach(el => {
            el.style.borderColor = ""; 
        })
        document.querySelectorAll(".label-span")?.forEach(el => {
            el.classList.add("hidden"); 
            el.textContent = "can't be empty"; 
        })

        document.querySelectorAll(".label__input")?.forEach(el =>  {
            el.classList.remove("text-alert"); 
        })
    }
    addEmailAlertStyle(){
       const input =  document.getElementById("email"); 
       const label = document.querySelector(".label__email"); 
       const span = document.querySelector(".span__email"); 

       label.classList.add("text-alert"); 
       input.style.borderColor ="#eb4d4b"; 
       span.textContent = "Wrong format"; 
       span.classList.remove("hidden"); 


    }
 
    }
   



export default new FormView(); 