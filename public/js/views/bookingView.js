
class BookView{
    constructor(){

    }

    addHandlerPaybtn(handler){
        document.querySelector(".btn--pay")?.addEventListener("click", () => {
             console.log(this);
             
            const data = [...new FormData(document.querySelector(".form"))]
            
            const dataObj = Object.fromEntries(data); 
            handler(dataObj); 
        })
    }
  
}

export default new BookView(); 