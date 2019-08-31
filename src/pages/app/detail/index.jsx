import React, { Component } from 'react';
import './style.less';
import { Badge, Button, Card, Descriptions, Divider, Icon, message, Modal, Progress, Steps, Table, Tooltip } from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';

const progressColumns = [
  {
    title: '编号',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '时间',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '描述',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作员',
    dataIndex: 'operator',
    key: 'operator',
  },
];

const { Step } = Steps;
const { confirm } = Modal;

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['已关闭', '启动中', '运行中', '异常'];


export default class AppDetail extends Component {
  static displayName = 'AppDetail';

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      profileBasic: {
        basicGoods: [],
        basicProgress: [],
      },
      handlerStatusModelVisible: false,
    };
  }

  componentDidMount() {
  }

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
    const { profileBasic, loading, handlerStatusModelVisible } = this.state;
    const { basicGoods, basicProgress } = profileBasic;
    let goodsData = [];

    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach((item) => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };

      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }

      return obj;
    };

    const goodsColumns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '耗时',
        dataIndex: 'cost',
        key: 'cost',
        render: renderContent,
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作员',
        dataIndex: 'operator',
        key: 'operator',
        render: renderContent,
      },
      {
        title: '运行实例数',
        dataIndex: 'num',
        key: 'num',
        render: (text, row, index) => {
          if (index < basicGoods.length) {
            return text;
          }

          return (
            <span
              style={{
                fontWeight: 600,
              }}
            >
              {text}
            </span>
          );
        },
      },
    ];

    const columns = [
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: '端口',
        dataIndex: 'port',
        key: 'port',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
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
            <Descriptions.Item label="应用名称">支付宝</Descriptions.Item>
            <Descriptions.Item label="git仓库地址">git@github.com:xxx/project-a.git</Descriptions.Item>
            <Descriptions.Item label="所属项目">八卦</Descriptions.Item>
            <Descriptions.Item label="应用名描述">那是一种内在的东西， 他们到达不了，也无法触及的</Descriptions.Item>
            <Descriptions.Item label="所有者">卡卡西</Descriptions.Item>
            <Descriptions.Item label="上次构建成功时间">2019-08-28 09:09:09</Descriptions.Item>
            <Descriptions.Item label="运行实例数">1/3</Descriptions.Item>
            <Descriptions.Item label="停止实例数">0/3</Descriptions.Item>
            <Descriptions.Item label="异常实例数">1/3</Descriptions.Item>
          </Descriptions>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <div className="title">实例状态</div>
          <Table columns={columns}
            dataSource={data}
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
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className="title">编辑历史</div>
          <Table
            style={{
              marginBottom: 16,
            }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
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
