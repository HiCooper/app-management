import React, { Component } from 'react';
import './style.less';
import { Badge, Button, Card, Descriptions, Divider, Icon, message, Modal, Progress, Steps, Table, Tooltip } from 'antd';
import AceEditor from 'react-ace';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { DetailAppApi } from '../../../api/app';
import { getParamsFromUrl } from '../../../util/stringUtils';
import 'brace/mode/sh';
import 'brace/theme/chrome';

const { Step } = Steps;
const { confirm } = Modal;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['已关闭', '启动中', '运行中', '异常'];


export default class AppDetail extends Component {
  static displayName = 'AppDetail';

  constructor(props) {
    super(props);
    const query = this.props.location.search;
    const paramsFromUrl = getParamsFromUrl(query);
    console.log(query);
    this.state = {
      id: paramsFromUrl.appId,
      loading: false,
      handlerStatusModelVisible: false,
      detailInfo: {},
    };
  }

  componentDidMount() {
    this.initDetail();
  }

  initDetail = () => {
    const params = {
      id: this.state.id,
    };
    DetailAppApi(params).then((res) => {
      if (res.code === '200') {
        this.setState({
          detailInfo: res.data,
        });
      }
    });
  };

  startApp = (e) => {
    e.preventDefault();
    this.showModal();
  };

  stopApp = (e) => {
    e.preventDefault();
    this.showModal();
  };

  restartApp = (e) => {
    e.preventDefault();
    this.showModal();
  };

  showModal = () => {
    this.setState({
      handlerStatusModelVisible: true,
    });
  };

  getTaskDetail = (e) => {
    e.preventDefault();
    this.showModal();
  };

  handleCancel = () => {
    this.setState({ handlerStatusModelVisible: false });
  };

  showStopTaskConfirm = () => {
    const that = this;
    confirm({
      title: '确定要中止正在运行的任务吗?',
      content: '任务执行将会中止，程序可能停止运行',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        that.stopTask();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  stopTask = () => {
    const hide = message.loading('正在中止任务执行..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };

  render() {
    const { loading, handlerStatusModelVisible, detailInfo } = this.state;
    console.log(detailInfo);

    const buildHistoryColumns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '服务器',
        dataIndex: 'serverAddress',
        key: 'serverAddress',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: '耗时',
        dataIndex: 'endTime',
        key: 'cost',
        render: (text, record) => {
          const cost = new Date(text) - new Date(record.startTime);
          return (
            <span>
              {(cost / 1000)}
              秒
            </span>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'resultState',
        key: 'resultState',
      },
      {
        title: '操作员',
        dataIndex: 'operator',
        key: 'operator',
      },
    ];

    const columns = [
      {
        title: '服务器名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: '端口',
        dataIndex: 'serverPort',
        key: 'port',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render(val) {
          if (val) {
            return <Badge status={statusMap[val]} text={status[val]} />;
          }
          return '-';
        },
      },
      {
        title: '进行中任务',
        dataIndex: 'task',
        key: 'task',
        render: (text, record) => {
          if (text) {
            return (
              <div>
                <span>{text}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip title="点击查看详情" placement="left">
                    <Progress
                      className="progress-task"
                      onClick={e => this.getTaskDetail(e)}
                      percent={record.percent}
                      status={record.percent >= 100 ? 'done' : 'active'}
                    />
                  </Tooltip>
                  <Tooltip title="结束任务">
                    <div className="mini-btn" onClick={this.showStopTaskConfirm}>
                      <Icon type="close-circle" />
                    </div>
                  </Tooltip>
                </div>
              </div>
            );
          }
          return '-';
        },
      },
      {
        title: '操作',
        key: 'action',
        align: 'right',
        render: (text, record) => {
          if (!record.task || record.percent >= 100) {
            return (
              <div>
                <Button type="link" onClick={e => this.startApp(e)}>
                  <Icon type="caret-right" />
                </Button>
                <Divider type="vertical" />
                <Button type="link" onClick={e => this.stopApp(e)}>
                  <Icon type="poweroff" />
                </Button>
                <Divider type="vertical" />
                <Button type="link" onClick={e => this.restartApp(e)}>
                  <Icon type="reload" />
                </Button>
              </div>
            );
          }
        },
      },
    ];

    const data = [
      {
        key: '1',
        ip: '192.168.2.123',
        port: 8970,
        state: '0',
      },
      {
        key: '2',
        ip: '192.168.2.124',
        port: 8970,
        state: '1',
        task: '构建中',
        percent: 28,
      },
      {
        key: '3',
        ip: '192.168.2.125',
        port: 8970,
        state: '2',
      },
    ];
    return (
      <PageHeaderWrapper className="app-detail-home">
        <Card bordered={false}>
          <Descriptions
            title="基本信息"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="应用名称">{detailInfo.name}</Descriptions.Item>
            <Descriptions.Item label="git仓库地址">{detailInfo.gitUrl}</Descriptions.Item>
            <Descriptions.Item label="所属项目">{detailInfo.projectName}</Descriptions.Item>
            <Descriptions.Item label="应用名描述">{detailInfo.description}</Descriptions.Item>
            <Descriptions.Item label="所有者">{detailInfo.username}</Descriptions.Item>
          </Descriptions>
          <div className="title">构建脚本</div>
          <div className="build-sh">
            <AceEditor
              mode="sh"
              fontSize={14}
              height="200px"
              width="100%"
              theme="chrome"
              name="build-sh-detail"
              value={detailInfo.buildSh}
              readOnly
              showPrintMargin={false}
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className="title">实例状态</div>
          <Table
            columns={columns}
            rowKey="name"
            dataSource={detailInfo.appAndServerList}
            pagination={false}
            style={{
              marginBottom: 32,
            }}
          />
          <div className="title">构建历史</div>
          <Table
            style={{
              marginBottom: 24,
            }}
            pagination={false}
            loading={loading}
            dataSource={detailInfo.buildHistoryList}
            columns={buildHistoryColumns}
            rowKey="id"
          />
        </Card>
        <Modal
          visible={handlerStatusModelVisible}
          title="192.168.2.124(启动)"
          onCancel={this.handleCancel}
          destroyOnClose
          footer={[
            <Button key="close" onClick={this.handleCancel}>
              关闭
            </Button>,
          ]}
        >
          <Steps direction="vertical" size="small" current={1}>
            <Step status="finish" title="更新源代码" description="从git拉取或更新源代码" />
            <Step status="process" title="打包构建" description="构建jar或war包" icon={<Icon type="loading" />} />
            <Step status="wait" title="构建Docker镜像" description="构建Docker镜像" />
            <Step status="wait" title="上传镜像" description="上传镜像到云库" />
            <Step status="wait" title="备份旧版镜像" description="备份旧版镜像" />
            <Step status="wait" title="运行新镜像容器" description="从云库拉取最新镜像并启动" />
          </Steps>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
