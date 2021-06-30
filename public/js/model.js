

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
