class UserView {
    signForm = document.querySelector(".sign"); 
    userNameBox = document.querySelector(".nav__el-profile"); 
    constructor(){


    }

    addHandlerSignUpForm(handler){
        this.signForm?.addEventListener("submit", function(e){
            e.preventDefault(); 

    
            
            const data = [...new FormData(this)]
            const dataObj = Object.fromEntries(data)

            handler(dataObj)
            
        })
    }
    addProfileHandler(){
        this.userNameBox?.addEventListener("click", function(e){
            e.preventDefault(); 

            document.querySelector(".profile").classList.toggle("hidden"); 
        })
    }

    removeProfile(){
       /*  document.querySelector("body")?.addEventListener("click", function(e){
          if(e.target.classList.contains("profile") || e.target.classList.contains("nav__el-profile")) return; 
          document.querySelector(".profile").classList.add("hidden");

        }) */
    }
}

export default new UserView (); 