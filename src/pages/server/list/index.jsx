import React, { Component } from 'react';
import { Card, Table } from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import SearchForm from './SearchForm';

import './style.less';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'ip',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: '免密登录',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '运行应用数',
    key: 'runAppCount',
    dataIndex: 'runAppCount',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <span>
        <Link to="/">配置 </Link>
      </span>
    ),
  },
];

const data = [
  {
    id: '1',
    name: '服务器1',
    ip: '192.168.2.123',
    state: '正常',
    runAppCount: 5,
  },
  {
    id: '2',
    name: '服务器2',
    ip: '192.168.2.124',
    state: '正常',
    runAppCount: 6,
  },
  {
    id: '3',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '4',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '5',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '6',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '7',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '8',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '9',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '10',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '11',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '12',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },
  {
    id: '13',
    name: '服务器3',
    ip: '192.168.2.125',
    state: '正常',
    runAppCount: 7,
  },

];
export default class ServerList extends Component {
  static displayName = 'ServerList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper className="server-list-home">
        <Card className="card-content">
          <SearchForm />
          <Table rowKey="id" columns={columns} dataSource={data} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
