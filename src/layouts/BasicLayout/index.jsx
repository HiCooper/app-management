import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, Col, Divider, Icon, Layout, Menu, Popover, Row } from 'antd';
import MainRouter from './MainRouter';
import sideMenuConfig from '../../menuConfig';
import './index.scss';

const { Header, Content, Sider } = Layout;

class BasicLayout extends Component {
  static displayName = 'BasicLayout';

  constructor(props) {
    super(props);
    const { pathname } = this.props.location;
    this.state = {
      color: '#00a2ae',
      userName: 'HiCooper',
      activateMenuPath: pathname,
    };
  }

  subMenuSelect = (item) => {
    const location = this.props.location;
    if (item.key !== location.pathname) {
      this.props.history.push(item.key);
      this.setState({
        activateMenuPath: item.key,
      });
    }
  };

  text = () => {
    const { userName, color } = this.state;
    return (
      <div className="personal">
        <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: '5px' }} size="large">
          {userName.substr(0, 1)}
        </Avatar>
        <span>{userName}</span>
      </div>
    );
  };

  content = () => {
    return (
      <div className="personal-card-content">
        <div className="btn-group">
          <div className="item">
            <Icon type="user" style={{ fontSize: '20px' }} />
            <div className="title">
              个人信息
            </div>
          </div>
          <div className="item">
            <Icon type="key" style={{ fontSize: '20px' }} />
            <div className="title">
              密钥管理
            </div>
          </div>
        </div>
        <Divider style={{ margin: '10px 0' }} />
        <div className="footer">
          <Button type="link" style={{ color: '#ccccccc' }}>
            <Icon type="poweroff" />
            退出当前账户
          </Button>
        </div>
      </div>
    );
  };

  renderMenuItem = (item) => {
    return (
      <Menu.Item key={item.path}>
        <Row>
          <Col span={4}>
            {
              item.icon ? (<Icon type={item.icon} theme="filled" />) : <span className="bucket-dot" />
            }
          </Col>
          <Col span={20}>
            {item.name}
          </Col>
        </Row>
      </Menu.Item>
    );
  };

  render() {
    const { color, userName, activateMenuPath } = this.state;
    return (
      <Layout className="basic-layout">
        <Header className="default-header">
          <div className="left">
            <div className="logo">
              <Icon type="hdd" />
              <span style={{ marginLeft: '5px' }}>应用管理系统</span>
            </div>
          </div>
          <div className="right">
            <Popover placement="bottomRight"
              title={this.text()}
              content={this.content()}
              trigger="click"
              className="personal-info"
            >
              <div>
                <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: '5px' }}>
                  {userName.substr(0, 1)}
                </Avatar>
                <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
                  {userName}
                </span>
              </div>
            </Popover>
          </div>
        </Header>
        <Layout className="main-section">
          <Sider width={220} className="default-side">
            <Menu
              onSelect={this.subMenuSelect}
              mode="inline"
              defaultOpenKeys={['1']}
              defaultSelectedKeys={[activateMenuPath]}
              selectedKeys={[activateMenuPath]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                sideMenuConfig.map(this.renderMenuItem)
              }
            </Menu>
          </Sider>
          <Layout className="main-content">
            <Content className="content">
              <MainRouter />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(BasicLayout);
