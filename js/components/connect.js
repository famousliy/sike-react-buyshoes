const React = require("react");

function MakeConnectedComponent(ViewComponent,store,...propNames) {
  // 注意：ViewComponent 这个参数必须大写，为什么？
  // TODO：定义 ConnectedViewComponent
	class ConnectedViewComponent extends React.Component {
	  componentDidMount() {
	  	store.addChangeListener(this.forceUpdate.bind(this));
	  }
	  render() {
	    let storeProps = {};
	    for (let propName of propNames) {
	      storeProps[propName] = store[propName]();
	    };
	    // 2. Pass the data to `contentRenderFunction`.
	    return (
	    	<ViewComponent {...storeProps} {...this.props} />
	    );
	  }
	}
  // 返回 Component
  return ConnectedViewComponent;
}

function connect(store,...propNames) {
  return (ViewComponent) => {
    return MakeConnectedComponent(ViewComponent,store,...propNames);
  };
}
module.exports = connect;