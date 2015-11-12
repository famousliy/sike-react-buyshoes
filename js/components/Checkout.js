const React = require("react");
const CartStore = require("../stores/CartStore");
const {products} = require("../data");

let Checkout = React.createClass({
  componentDidMount() {
    CartStore.addChangeListener(this.forceUpdate.bind(this));
  },
  render() {
    let subtotal = 0;
    let cartItems = CartStore.getCartItem();
    Object.keys(cartItems).forEach(key => {
      let {quantity} = cartItems[key];
      let {price} = products[key];
      subtotal += price * quantity;
    });

    return (
      <div className="checkout">
        <hr className="checkout__divider" />

        <input type="text" className="checkout__coupon-input" placeholder="coupon code" />

        <div className="checkout__line">
          <div className="checkout__line__label">
            Subtotal
          </div>
          <div className="checkout__line__amount">
            {`$${subtotal.toFixed(2)}`}
          </div>
        </div>

        <a className="checkout__button">
          <img className="checkout__button__icon" src="img/cart-icon.svg" />
          <div className="checkout__button__label">
            Checkout
          </div>
        </a>
      </div>
    );
  }
});

module.exports = Checkout;