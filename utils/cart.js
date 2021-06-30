 const helper = require("./helper")
 class Cart {
  constructor(items,ids) {
    this.items = items ? items : [];
    this.totalQuantity = 0; 
    this.totalPrice = 0; 
    this.covertTotal = 0; 
    this.grandTotal = 0; 
    this.ids = ids ? ids: [];  
    
  }

  saveItem(item, id, quantity) {
    const foundItem = this.findItem(id);
 
 
    if (!foundItem) {
      const newObj = {
        image: item.image,
        gallery: item.gallery,
        new: item.new,
        _id: item._id,
        slug: item.slug,
        name: item.name,
        category: item.category,
        price: item.price,
        cartPrice: item.price,
        description: item.description,
        includes: item.includes,
        others: item.others,
        quantity: quantity,
        convertPrice:helper.formatPrice(item.price),
        cartName: helper.formatCartName(item.name)
        
      }
      
   
 
      this.items.push(newObj); 
 
      
      this.ids.push(newObj._id); 
    
      
    } else {
     
      this.calculatePrice(foundItem, quantity, item);
    }
    
    
    this.calculateTotals(); 

  }

  updateItem(id, quantity){
    const foundItem = this.findItem(id);

    if(quantity === 0){

      
    }else if(quantity > 0){
      foundItem.quantity = quantity; 
      foundItem.cartPrice = foundItem.quantity * foundItem.price; 
      foundItem.convertPrice = helper.formatPrice(foundItem.price)
      this.calculateTotals(); 
    }
  }
  deleteItem(id){

    console.log(id);
    
    const newItems = this.items.filter(item => item._id !== id); 
    const newItemIds = this.ids.filter(i => i != id); 
    this.items = newItems; 
    this.ids = newItemIds; 
    this.calculateTotals(); 

  }

  findItem(id) {
    return this.items?.find((item) => item._id === id);
  }

  calculateTotals(){
    this.totalQuantity = this.items.reduce((acc, item) => acc + item.quantity,0)
    this.totalPrice = this.items.reduce((acc, val) => acc + val.cartPrice, 0); 
    this.covertTotal = helper.formatPrice(this.totalPrice); 
    this.grandTotal = helper.formatPrice(this.totalPrice + 50); 
  }
  calculatePrice(foundItem, quantity, item){
    foundItem.quantity += quantity;
    foundItem.cartPrice += item.price;
    foundItem.convertPrice = helper.formatPrice(item.price); 
  }
}

module.exports = Cart;