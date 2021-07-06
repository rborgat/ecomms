class NavView {


    displayMinNav(){
        document.querySelector(".nav__el--hamburger")?.addEventListener("click", function(e){

            document.querySelector(".navigation")?.classList.remove("hidden"); 
        })
    }

    removeMinNav(e){   
    
       document.querySelector(".navigation")?.classList.add("hidden"); 
    
    }
    addRemoveNavHandler(){
        document.querySelector(".navigation__img").addEventListener('click', this.removeMinNav)
    }
    addRemoveLinksHandler(){
        document.querySelectorAll(".navigation__item")?.forEach(item => item.addEventListener("click", this.removeMinNav))
    }
}

export default new NavView();
