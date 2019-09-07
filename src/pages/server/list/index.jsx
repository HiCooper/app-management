import React, { Component } from 'react';
import { Button, Card, Table } from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import SearchForm from './SearchForm';

import './style.less';
import { Link } from 'react-router-dom';
import { ListServerApi } from '../../../api/server';
import AddServerModal from './components/AddServerModal';

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

export default class ServerList extends Component {
  static displayName = 'ServerList';

  constructor(props) {
    super(props);
    this.state = {
      serverList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  }

  componentDidMount() {
    this.initServerList();
  }

  initServerList = () => {
    const params = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    ListServerApi(params).then((res) => {
      if (res.msg === 'SUCCESS') {
        this.setState({
          serverList: res.data.records,
          total: res.data.total,
        });
      }
    });
  };

  createServerSuccess = async () => {
    await this.setState({
      pageNum: 1,
    });
    this.initServerList();
    this.closeModal();
  };

  showAddFormModal = (e) => {
    e.preventDefault();
    this.setState({
      addFormVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      addFormVisible: false,
    });
  };

  render() {
    const { serverList, total, addFormVisible } = this.state;
    const extraContent = (
      <Button type="primary" onClick={e => this.showAddFormModal(e)}>添加服务器</Button>
    );
    return (
      <PageHeaderWrapper className="server-list-home" extraContent={extraContent}>
        <Card className="card-content">
          <SearchForm />
          <Table rowKey="id" columns={columns} dataSource={serverList} pagination={total} />
          <AddServerModal onClose={this.closeModal} submitSuccess={this.createServerSuccess} visible={addFormVisible} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
