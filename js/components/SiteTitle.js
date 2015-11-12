const React = require("react");
const ProductStore = require('../stores/ProductStore');
const connect = require("./connect");

let SiteTitle = React.createClass({
	
  onLike() {
    ProductStore.toggleShowOnlyLike();
  },

  render() {
  	let {showOnlyLike} = this.props;
    return (
      <div className="title">
        <h2>Buy Me Shoes</h2>
        <img className="title__heart" src={"img/heart" + (showOnlyLike ? "-liked" :"") + ".svg"} onClick={this.onLike.bind(this)} />
      </div>
    );
  }
});

@connect(ProductStore,"showOnlyLike")
class ConnectedSiteTitle extends SiteTitle {};

module.exports = ConnectedSiteTitle;