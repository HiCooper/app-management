import React, { Component } from 'react';
import './style.less';
import { Badge, Button, Card, Descriptions, Divider, Icon, Table } from 'antd';
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
    };
  }

  componentDidMount() {
  }

  render() {
    const { profileBasic, loading } = this.state;
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
        render: (text) => {
          if (text === 'success') {
            return <Badge status="success" text="成功" />;
          }

          return <Badge status="processing" text="进行中" />;
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

    const renderState = (state) => {
      if (state === 'success') {
        return (
          <div>
            <Badge status={state} />
            <span>运行中</span>
          </div>
        );
      }
      if (state === 'error') {
        return (
          <div>
            <Badge status={state} />
            <span>状态异常</span>
          </div>
        );
      }
      if (state === 'default') {
        return (
          <div>
            <Badge status={state} />
            <span>已停止</span>
          </div>
        );
      }
      if (state === 'processing') {
        return (
          <div>
            <Badge status={state} />
            <span>启动中</span>
          </div>
        );
      }
      return (
        <div>
          <Badge status={state} />
          <span>未知状态</span>
        </div>
      );
    };

    const columns = [
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: 'PORT',
        dataIndex: 'port',
        key: 'port',
      },
      {
        title: 'STATE',
        dataIndex: 'state',
        key: 'state',
        render: text => (
          <div>
            {
              renderState(text)
            }
          </div>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        align: 'right',
        render: () => (
          <span>
            <Button type="link">
              <Icon type="caret-right" />
            </Button>
            <Divider type="vertical" />
            <Button type="link">
              <Icon type="poweroff" />
            </Button>
            <Divider type="vertical" />
            <Button type="link">
              <Icon type="reload" />
            </Button>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        ip: '192.168.2.123',
        port: 8970,
        state: 'success',
      },
      {
        key: '2',
        ip: '192.168.2.124',
        port: 8970,
        state: 'processing',
      },
      {
        key: '3',
        ip: '192.168.2.125',
        port: 8970,
        state: 'error',
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
      </PageHeaderWrapper>
    );
  }
}
