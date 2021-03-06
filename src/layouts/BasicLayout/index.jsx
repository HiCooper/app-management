import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import MainRouter from './MainRouter';
import './index.scss';
import logo from '../../asserts/logo.svg';

import Index from '../../components/GlobalHeader';

import sideMenuConfig from '../../menuConfig';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class BasicLayout extends Component {
  static displayName = 'BasicLayout';


  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    const firstPath = [pathname.substr(0, pathname.lastIndexOf('/'))];
    this.state = {
      collapsed: false,
      defaultOpenKey: firstPath,
      defaultActive: pathname,
    };
  }

  toggle = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  handleClick = (e) => {
    this.props.history.push(e.key);
  };

  render() {
    const { defaultActive, defaultOpenKey } = this.state;
    return (
      <Layout className="basic-layout">
        <Sider width={256}
          breakpoint="lg"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className="menu-sider"
          style={{
            height: '100vh',
          }}
        >
          <div className="logo">
            <img src={logo} alt="" />
            <h1>应用运行监控系统</h1>
          </div>
          <Menu theme="dark"
            mode="inline"
            defaultOpenKeys={defaultOpenKey}
            defaultSelectedKeys={[defaultActive]}
            onOpenChange={this.onOpenChange}
            onClick={this.handleClick}
          >
            {
              sideMenuConfig.map((item) => {
                if (item.children && item.children.length > 0) {
                  return (
                    <SubMenu
                      key={item.path}
                      title={(
                        <span>
                          <svg className="icon" aria-hidden="true" style={{ marginRight: 5 }}>
                            <use xlinkHref={`#${item.icon}`} />
                          </svg>
                          <span>{item.name}</span>
                        </span>
                      )}
                    >
                      {
                        item.children.map((childItem) => {
                          return <Menu.Item key={item.path + childItem.path}>{childItem.name}</Menu.Item>;
                        })
                      }
                    </SubMenu>
                  );
                }
                return (
                  <Menu.Item key={item.path}>
                    <svg className="icon" aria-hidden="true" style={{ marginRight: 5 }}>
                      <use xlinkHref={`#${item.icon}`} />
                    </svg>
                    <span>{item.name}</span>
                  </Menu.Item>
                );
              })
            }
          </Menu>
        </Sider>
        <Layout
          style={{
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Header style={{ background: '#fff', padding: 0 }} className="global-header">
            <Index />
          </Header>
          <Content className="global-content">
            <MainRouter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
