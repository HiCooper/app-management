import React, { Component } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import avatar from '../../asserts/avatar.png';
import styles from './index.less';
import { removeAll } from '../../util/auth';

export default class AvatarDropdown extends Component {
  static displayName = 'AvatarDropdown';

  constructor(props) {
    super(props);
    this.state = {};
  }

  onMenuClick = (event) => {
    const { key } = event;
    if (key === '/user/login') {
      removeAll();
    }
    this.goPage(key);
  };

  goPage = (route) => {
    window.location.replace(`${window.location.protocol}//${window.location.host}/#${route}`);
  };

  render() {
    const {
      currentUser = {
        avatar,
        name: '卡卡西',
      },
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className="menu" onClick={this.onMenuClick}>
        <Menu.Item key="/home/center">
          <UserOutlined />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item key="/home/settings">
          <SettingOutlined />
          <span>个人设置</span>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item key="/user/login">
          <LogoutOutlined />
          <span>退出登陆</span>
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className="action account">
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={styles.name}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  }
}
