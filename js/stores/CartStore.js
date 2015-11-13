const EventEmitter = require("events");
let AppDispatcher = require("./AppDispatcher");

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit("change");
}

let _cartItems = {};
let _actionLog = [];
// 写 API 现在是私有的了
function updateCartItemQuantity({productId,quantity}) {
  _cartItems[productId].quantity = quantity;
  emitChange();
}

function addCartItem({productId}) {
  let item = {};
  item.id = productId;
  item.quantity = 1;
  _cartItems[productId] = item;
  emitChange();
}

function removeCartItem({productId}) {
  delete _cartItems[productId];
  emitChange();
}

function undoShoppingCart() {
  let lastAction = _actionLog.pop();
  if (lastAction.type === "addCartItem") {
     removeCartItem(lastAction);
   } else if (lastAction.type === "removeCartItem") {
     addCartItem(lastAction);
   }
  emitChange();
}

// 调用写方法的唯一途径是监听某个事件
AppDispatcher.register((action) => {
   if(action.type === "updateCartItemQuantity") {
     updateCartItemQuantity(action);
   } else if (action.type === "addCartItem") {
     _actionLog.push(action);
     addCartItem(action);
   } else if (action.type === "removeCartItem") {
     _actionLog.push(action);
     removeCartItem(action);
   } else if (action.type === "undoShoppingCart") {
     undoShoppingCart();
   }
});

module.exports = {
  // 读方法
  getCartItem() {
    return _cartItems;
  },

  // getCartItems 方法的别名
  cartItems() {
    return _cartItems;
  },

  // 写方法都被挪到私有




  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  },
}