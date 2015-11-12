const EventEmitter = require("events");

let emitter = new EventEmitter();

function emitChange() {
  emitter.emit("change");
}

let _likeItems = {};

module.exports = {


  likeItems() {
    return _likeItems;
  },

  // 写方法。这些就是 "action"
  clickLikeItem(productId) {
    _likeItems[productId] === "liked" ? delete _likeItems[productId] : _likeItems[productId] = "liked";
    emitChange();
  },

  addChangeListener(callback) {
    emitter.addListener("change",callback)
  },

  removeChangeListener(callback) {
    emitter.removeListener("change",callback)
  },
}