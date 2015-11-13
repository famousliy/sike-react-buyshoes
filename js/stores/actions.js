let AppDispatcher = require("./AppDispatcher");


function addCartItem(productId) {
  AppDispatcher.dispatch({type: "addCartItem", productId: productId});
}

function removeCartItem(productId) {
  AppDispatcher.dispatch({type: "removeCartItem", productId: productId});
}

function updateCartItemQuantity(productId,quantity) {
  AppDispatcher.dispatch({type: "updateCartItemQuantity", productId: productId, quantity:quantity});
}

function undoShoppingCart() {
  AppDispatcher.dispatch({type: "undoShoppingCart"})
}

module.exports = {addCartItem,removeCartItem,updateCartItemQuantity,undoShoppingCart};