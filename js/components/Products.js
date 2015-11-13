const React = require("react");
const QuantityControl = require("./QuantityControl");
const CartStore = require("../stores/CartStore");
const LikeStore = require('../stores/LikeStore');
const ProductStore = require('../stores/ProductStore');
const connect = require("./connect");
const {clickLikeItem} = LikeStore;
const actions = require("../stores/actions");

let Product = React.createClass({
  onClick(id) {
    actions.addCartItem(id);
  },
  onLike(id) {
    LikeStore.clickLikeItem(id);
  },
  render() {
    let {id,name,price,imagePath} = this.props.product;
    let {cartItems,likeItems} = this.props;
    let item = cartItems[id];

    let productControl;
    if(item != null) {
      let {quantity} = item;
      productControl = (
        <QuantityControl item={item} variant="gray"/>
      );

    } else {
      productControl = (
        <a className="product__add" onClick={this.onClick.bind(this,id)}>
          <img className="product__add__icon" src="img/cart-icon.svg" />
        </a>
      );
    }

    return (
      <div className="product">

        <div className="product__display">
          <div className="product__img-wrapper">
            <img className="product__img" src={imagePath} />
          </div>

          <div className="product__control">
            {productControl}
          </div>

          <div className="product__price">
            {"$"+price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <img className="product__heart" src={"img/heart" + (likeItems[id] === "liked" ? "-liked" :"") + ".svg"} onClick={this.onLike.bind(this,id)}/>
        </div>
      </div>
    );
  },
});

let Products = React.createClass({
  renderProducts() {
    // let products ...
    let {cartItems,likeItems,filteredProducts} = this.props;
    let productViews = Object.keys(filteredProducts).map(id => {
      let product = filteredProducts[id];
      return (
        <Product key={id} product={product} cartItems={cartItems} likeItems={likeItems}/>
      );
    });

    return productViews;
  },

  render() {
    let {cartItems,likeItems} = this.props;
    return (
      <div ref="products" className="products">
        {this.renderProducts()}
      </div>
    );
  },
});

// Store 组件
@connect(CartStore,"cartItems")
@connect(LikeStore,"likeItems")
@connect(ProductStore,"filteredProducts")
class ConnectedProducts extends Products {};

module.exports = ConnectedProducts;