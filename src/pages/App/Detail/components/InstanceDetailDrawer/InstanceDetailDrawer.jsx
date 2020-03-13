import React, { Component } from 'react';
import { Badge, Descriptions, Drawer } from 'antd';
import './index.scss';


export default class InstanceDetailDrawer extends Component {
  static displayName = 'DetailDrawer';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <Drawer
        width={520}
        placement="right"
        closable
        maskClosable
        onClose={this.props.onClose}
        visible={this.props.visible}
        className="app-monitor-drawer"
        title="实例详情"
      >
        <Descriptions size="small" column={1} bordered>
          <Descriptions.Item label="容器Id">
            <span className="value">
              3bc827afe1bfe34fe555ba7fc09320504272e6d940cd3f21e8707c37c0dd7476
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">2019-09-01T15:28:23.858267074Z</Descriptions.Item>
          <Descriptions.Item label="启动参数">
            <span className="value">
              -Djava.security.egd=file:/dev/./urandom -jar /app.jar --spring.profiles.active=prod
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <Badge status="success" text="运行中" />
          </Descriptions.Item>
          <Descriptions.Item label="启动时间">2019-09-01T15:28:24.712166874Z</Descriptions.Item>
          <Descriptions.Item label="结束时间">2019-09-01T15:30:15.748710374Z</Descriptions.Item>

          <Descriptions.Item
            label="目录挂载"
          >
            <span className="value">
              /Users/xueancao/Document/IdeaProjects/app-minitor-backend/logs:/logs
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="端口映射">8088/tcp:8088</Descriptions.Item>
          <Descriptions.Item label="网络模式">default</Descriptions.Item>
        </Descriptions>
      </Drawer>
    );
  }
}
