import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { userRouterConfig } from '../../routerConfig';

export default class userRouter extends Component {
  static displayName = 'index';

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * 渲染路由组件
   * @param item
   * @returns {*}
   */
  renderNormalRoute = (item) => {
    if (item && item.children && item.children.length > 0) {
      return item.children.map(child => (
        <Route
          key={item.path + child.path}
          path={item.path + child.path}
          component={child.component}
          exact
        />
      ));
    }
    return (
      <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />);
  };


  render() {
    return (
      <Switch>
        {userRouterConfig.map(this.renderNormalRoute)}
        <Redirect exact strict from="/user/*" to="/user/login" />
      </Switch>
    );
  }
}
