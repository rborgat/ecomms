

export const validateForms = function (data) {
    let ans; 
  if(data.length <= 0){
      return false; 
  }else if  (data.length > 0) {
     ans = data.filter((el) => el[1] === "");
  
  }
  if(ans.length > 0){
      return false; 
  }
  return true; 
};

export const returnForm = function(data){
    if (data.length > 0) {
        return data.filter(el => el[1] === '');
      }
}
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}