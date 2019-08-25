import React, { Component } from 'react';
import { Avatar, Icon, Menu, Spin } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import avatar from '../../asserts/avatar.png';
import styles from './index.less';

export default class AvatarDropdown extends Component {
  static displayName = 'AvatarDropdown';

  constructor(props) {
    super(props);
    this.state = {};
  }

  onMenuClick = (event) => {
    const { key } = event;
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
        <Menu.Item key="/user/center">
          <Icon type="user" />
          <span>个人中心</span>
        </Menu.Item>
        <Menu.Item key="/user/settings">
          <Icon type="setting" />
          <span>个人设置</span>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item key="/user/login">
          <Icon type="logout" />
          <span>推出登陆</span>
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
