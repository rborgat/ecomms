const numeral = require("numeral");

exports.randomLetters = function (length) {
  const result = [];
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

exports.addOrderIdToItems = function (items, id, date) {
  items.forEach((item) => {
    item.order = id;
    item.date = date;
  });

  return items;
};

exports.formatPrice = (num) => {
  let price = numeral(num).format("$0,0");
  return price;
};

exports.formatCartName = (name) => {
  const newName = name.split(" ");
  let cartName = "";
  let secondPart = "";

  if (newName.length === 1) {
    cartName = newName;
  } else if (newName.length === 2) {
    cartName = newName.slice(0, 1);
  } else if (newName.length === 3) {
    secondPart = newName[1].split("");
    secondPart = secondPart.slice(0,1) + secondPart.slice(-1);
    cartName = `${newName.slice(0, 1)} ${secondPart}`.toUpperCase();
  } else {
    secondPart = newName[1].split("");
    secondPart = secondPart.slice(0,1) + secondPart.slice(-1);
    cartName = `${newName.slice(0, 1)} ${secondPart} ${newName[2].slice(0,2)}`.toUpperCase();
  }
  return cartName; 
};
