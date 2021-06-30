class UserView {
    signForm = document.querySelector(".sign")
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
}

export default new UserView (); 