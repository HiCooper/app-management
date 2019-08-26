import React, { Component } from 'react';
import { Layout } from 'antd';
import './indes.scss';
import { Redirect, Switch, Route } from 'react-router-dom';

import { userRouterConfig } from '../../routerConfig';

export default class index extends Component {
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
    return (
      <Route key={item.path} path={item.path} component={item.component} exact={item.exact} />);
  };

  render() {
    return (
      <Layout className="blank-layout">
        <Switch>
          {userRouterConfig.map(this.renderNormalRoute)}
          <Redirect exact strict from="/user/*" to="/user/login" />
        </Switch>
      </Layout>
    );
  }
}
