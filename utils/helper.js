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
  let price = numeral(num).format("$0,0.00");
  return price;
};
