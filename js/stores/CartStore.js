const EventEmitter = require("events");

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit("change");
}

let _cartItems = {};

module.exports = {
  // 读方法
  getCartItem() {
    return _cartItems;
  },

  // getCartItems 方法的别名
  cartItems() {
    return _cartItems;
  },

  // 写方法。这些就是 "action"
  addCartItem(productId) {
    let item = {};
    item.id = productId;
    item.quantity = 1;
    _cartItems[productId] = item;
    emitChange();
  },

  removeCartItem(productId) {
    delete _cartItems[productId];
    emitChange();
  },

  updateCartItemQuantity(productId,quantity) {
    _cartItems[productId].quantity = quantity;
    emitChange();
  },

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  },
}