/**
 * 定义应用路由
 */
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import { ConfigProvider, BackTop } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import BasicLayout from './layouts/BasicLayout';
import BlankLayout from './layouts/UserLayout';


// 按照 Layout 分组路由
// UserLayout 对应的路由：/user/xxx
// BasicLayout 对应的路由：/xxx
const router = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <BackTop />
      <HashRouter>
        <Switch>
          <Redirect exact strict from="/" to="/dashboard/analysis" />
          <Route path="/user/*" component={BlankLayout} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </HashRouter>
    </ConfigProvider>
  );
};

export default router();
