const React = require("react");
const actions = require("../stores/actions");

let QuantityControl = React.createClass({
  onClickMinus(id,quantity) {
    quantity > 1 && actions.updateCartItemQuantity(id,quantity - 1);
  },

  onClickPlus(id,quantity) {
    actions.updateCartItemQuantity(id,quantity + 1);
  },
  render() {
    let {variant} = this.props;
    let {id,quantity} = this.props.item;

    let className = "adjust-qty";
    if(variant === "gray") {
      className = "adjust-qty adjust-qty--gray";
    }

    return (
      <div className={className}>
        <a className="adjust-qty__button" onClick={this.onClickMinus.bind(this,id,quantity)}>-</a>
        <div className="adjust-qty__number">{quantity}</div>
        <a className="adjust-qty__button" onClick={this.onClickPlus.bind(this,id,quantity)}>+</a>
      </div>
    );
  }
});

module.exports = QuantityControl;