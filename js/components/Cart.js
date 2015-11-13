const React = require("react");
const Ps = require("perfect-scrollbar");
const CartStore = require('../stores/CartStore');
const ProductStore = require('../stores/ProductStore');
const connect = require("./connect");
const QuantityControl = require("./QuantityControl");
const actions = require("../stores/actions");

let Cart = React.createClass({
  componentDidMount() {
    let {$content} = this.refs;
    Ps.initialize($content);
  },
  undo() {
    actions.undoShoppingCart();
  },
  renderCartItems() {
    let {cartItems,products} = this.props;
    return Object.keys(cartItems).map(key => {
      let item = cartItems[key];
      return <CartItem key={key} item={item} products={products}/>
    });
  },

  render() {
    return (
      <div className="cart">
        <h3 className="cart__title">Shopping Cart</h3>
        <div ref="$content" className="cart__content">
          <h3 className="cart__title cart__title--spacer">Shopping Cart</h3>

          {this.renderCartItems()}

        </div> {/* cart-item */}
        <h3 className="cart__undo"><a onClick={this.undo}>undo</a></h3>
      </div>
    );
  }
});

let CartItem = React.createClass({
  onClick(id) {
    actions.removeCartItem(id);
  },
  render: function() {
    let {item,products} = this.props;
    let {id,quantity} = this.props.item;
    let {price,imagePath,name} = products[id];

    let priceDisplay = `$${price}`
    if(quantity >= 2) {
      priceDisplay = `${priceDisplay} x ${quantity}`
    }

    return (

      <div className="cart-item">
        <div className="cart-item__top-part">
          <div className="cart-item__image">
            <img src={imagePath} />
          </div>

          <div className="cart-item__top-part__middle">
            <div className="cart-item__title">
              {name}
            </div>
            <div className="cart-item__price">
              {priceDisplay}
            </div>
          </div>
          <img className="cart-item__trash" src="img/trash-icon.svg" onClick={this.onClick.bind(this,id)}/>
        </div> {/* cart-item__top-part */}

        <div className="cart-item__qty">
          <QuantityControl item={item}/>
        </div>
      </div>
    );
  }
});

@connect(CartStore,"cartItems")
@connect(ProductStore,"products")
class ConnectedCart extends Cart {};

module.exports = ConnectedCart;