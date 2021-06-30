class CartView {
  cartBtn = document.querySelector(".btn__cart");
  cartLogo = document.querySelector(".nav__el--cart"); 
  overlayBox = document.querySelector(".overlay")
  itemQuantity = document.querySelector(".detail-item__cart-input");
  constructor() {}

  addCartItemHandler(handler) {
    this.cartBtn?.addEventListener("click", function (e) {
      e.preventDefault();
        const id = document.querySelector(".detail-item").dataset.id; 
        const value = parseInt(document.querySelector(".detail-item__cart-input").value); 
        const  quantity = Number.isFinite(value) ? value : 1; 

      handler(id,quantity);
    });
  }
  displayCart(){
    this.cartLogo?.addEventListener("click", function(e){
        e.preventDefault(); 
        document.querySelector(".overlay").classList.toggle("hidden"); 
    })
  }
  removeCart(){
      document.querySelector(".overlay")?.addEventListener("click", function(e){
        if(!e.target.classList.contains("overlay")) return; 
        e.target.classList.add("hidden")
      })
  }
  updateCartItem(handler){
      document.querySelectorAll(".item-cart-quantity").forEach(el => el?.addEventListener("change", function(e){
       
        const id = e.target.parentElement.parentElement.dataset.id;
        const quantity = parseInt(e.target.value); 
     
        
        handler(id, quantity)
          
      }))
  }

  
}

export default new CartView();
