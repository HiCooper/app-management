import React, { Component } from 'react';
import { Button, Card, Divider, Modal, Table } from 'antd';
import Iframe from 'react-iframe';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import SearchForm from './SearchForm';

import './style.less';
import { ListServerApi } from '../../../api/server';
import AddServerModal from './components/AddServerModal';

export default class ServerList extends Component {
  static displayName = 'ServerList';

  constructor(props) {
    super(props);
    this.state = {
      serverList: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      consoleVisible: false,
      currentRecord: {},
      tableLoading: true,
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
          tableLoading: false,
        });
      }
    });
  };

  openConsole = (record, e) => {
    e.preventDefault();
    this.setState({
      consoleVisible: true,
      currentRecord: record,
    });
  };


  closeConsole = () => {
    this.setState({
      consoleVisible: false,
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
    const { serverList, tableLoading, total, addFormVisible, consoleVisible, currentRecord } = this.state;
    const extraContent = (
      <Button type="primary" onClick={e => this.showAddFormModal(e)}>添加服务器</Button>
    );

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
        render: (text, record) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="btn" onClick={e => this.openConsole(record, e)}>控制台</div>
            <Divider type="vertical" />
            <div className="btn">配置</div>
          </div>
        ),
      },
    ];

    return (
      <PageHeaderWrapper className="server-list-home" extraContent={extraContent}>
        <Card className="card-content">
          <SearchForm />
          <Table loading={tableLoading} rowKey="id" columns={columns} dataSource={serverList} pagination={total} />
          <AddServerModal onClose={this.closeModal} submitSuccess={this.createServerSuccess} visible={addFormVisible} />
          <Modal
            title={`控制台:${currentRecord.ip}`}
            width="90%"
            className="console-modal"
            style={{ top: 20, bottom: 20 }}
            visible={consoleVisible}
            footer={[
              <Button key="close" onClick={this.closeConsole}>
                关闭
              </Button>,
            ]}
            onCancel={this.closeConsole}
            destroyOnClose
          >
            <Iframe url="http://localhost:8888"
              width="100%"
              height="500px"
              id="myId"
              className="console"
              display="initial"
              allowFullScreen
              position="relative"
            />
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
