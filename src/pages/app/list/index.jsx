import React, { Component } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Table,
} from 'antd';
import { findDOMNode } from 'react-dom';
import './style.less';
import { Link } from 'react-router-dom';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search, TextArea } = Input;

class AppList extends Component {
  static displayName = 'AppList';

  constructor(props) {
    super(props);
    this.state = {
      cardLoading: false,
      visible: false,
      current: undefined,
    };
  }

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  componentDidMount() {
    this.initData();
  }

  initData = () => {

  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  openNotificationWithIcon = (type, title, description) => {
    notification[type]({
      message: title,
      description,
      duration: 4,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.openNotificationWithIcon('success', '应用添加成功',
        <div>
          <span style={{ color: 'green', fontWeight: '600', marginRight: '8px' }}>
            {fieldsValue.appName}
          </span>
          已创建，配置后可用
        </div>);
      this.handleDone();
      dispatch({
        type: 'listBasicList/submit',
        payload: {
          id,
          ...fieldsValue,
        },
      });
    });
  };

  goPage = (route, appId, e) => {
    e.preventDefault();
    this.props.history.push(`${route}?appId=${appId}`);
  };

  render() {
    const { cardLoading, visible, current } = this.state;
    const { form: { getFieldDecorator } } = this.props;

    const modalFooter = {
      okText: '保存',
      onOk: this.handleSubmit,
      onCancel: this.handleCancel,
    };

    const Info = ({ title, value, bordered, status }) => (
      <div className="headerInfo">
        <Badge status={status} />
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className="extraContent">
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">运行中</RadioButton>
          <RadioButton value="progress">已停止</RadioButton>
          <RadioButton value="waiting">状态异常</RadioButton>
        </RadioGroup>
        <Search className="extraContentSearch" placeholder="请输入应用名称/所有者" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

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
          <Badge status="warning" />
          <span>未知状态</span>
        </div>
      );
    };

    const onChange = (value) => {
      console.log(`selected ${value}`);
    };

    const onSearch = (val) => {
      console.log('search:', val);
    };

    const getModalContent = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="应用名称" {...this.formLayout}>
            {getFieldDecorator('appName', {
              rules: [
                {
                  required: true,
                  message: '请输入应用名称',
                },
              ],
              initialValue: current && current.appName,
            })(<Input placeholder="请输入应用名称" />)}
          </FormItem>
          <FormItem label="git(SSH)仓库地址" {...this.formLayout}>
            {getFieldDecorator('appName', {
              rules: [
                {
                  required: true,
                  message: '请输入git仓库地址(SSH)!',
                },
              ],
              initialValue: current && current.appName,
            })(<Input placeholder="git@github.com:xxx/project-a.git" />)}
          </FormItem>
          <FormItem label="所属项目" {...this.formLayout}>
            {getFieldDecorator('projectId', {
              rules: [
                {
                  required: true,
                  message: '请输入应用名称',
                },
              ],
              initialValue: current && current.projectId,
            })(
              <Select
                showSearch
                placeholder="请选择所属项目"
                onChange={onChange}
                onSearch={onSearch}
              >
                <Option value="1">八卦</Option>
                <Option value="2">洛书</Option>
                <Option value="3">司南</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="应用描述">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入至少五个字符的应用描述！',
                  min: 5,
                },
              ],
              initialValue: current && current.description,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };

    const columns = [
      {
        title: '应用名称',
        dataIndex: 'appName',
        key: 'appName',
        render: (text, record) => (
          <div className="app-base-info">
            <Avatar src={record.logo} shape="square" size="large" style={{ marginRight: 16 }} />
            <div>
              <h4>
                <Link to={`/app/detail?appId=${record.id}`}>{record.appName}</Link>
              </h4>
              <div className="desc">{record.description}</div>
            </div>
          </div>
        ),
      },
      {
        title: '所有者',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: '上次启动成功时间',
        dataIndex: 'lastSuccessTime',
        key: 'lastSuccessTime',
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        render: (text) => {
          return renderState(text);
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="link" onClick={e => this.goPage('/app/config', record.id, e)}>配置</Button>
            <Divider type="vertical" />
            <Button type="link" onClick={e => this.goPage('/app/detail', record.id, e)}>详情</Button>
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        owner: 'John Brown',
        appName: 'Alipay',
        description: '那是一种内在的东西， 他们到达不了，也无法触及的',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'New York No. 1 Lake Park',
        state: 'success',
      },
      {
        key: '2',
        owner: 'Jim Green',
        appName: 'Angular',
        description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'London No. 1 Lake Park',
        state: 'default',
      },
      {
        key: '3',
        owner: 'Joe Black',
        appName: 'Ant Design',
        description: '生命就像一盒巧克力，结果往往出人意料',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'Sidney No. 1 Lake Park',
        state: 'processing',
      },
      {
        key: '4',
        owner: 'Joe Black',
        appName: 'Ant Design Pro',
        description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'Sidney No. 1 Lake Park',
        state: 'error',
      },
    ];

    return (
      <PageHeaderWrapper className="standardList">
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="运行中" value="8个" bordered status="success" />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="已停止" value="32" bordered status="default" />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="状态异常" value="24个" status="error" />
            </Col>
          </Row>
        </Card>

        <Card
          loading={cardLoading}
          className="listCard"
          bordered={false}
          title="应用列表"
          style={{
            marginTop: 24,
          }}
          bodyStyle={{
            padding: '0 32px 40px 32px',
          }}
          extra={extraContent}
        >
          <Button
            type="dashed"
            style={{
              width: '100%',
              marginBottom: 8,
            }}
            icon="plus"
            onClick={this.showModal}
            ref={(component) => {
              // eslint-disable-next-line  react/no-find-dom-node
              this.addBtn = findDOMNode(component);
            }}
          >
            添加
          </Button>
          <Table
            columns={columns}
            dataSource={data}
            showHeader
            pagination={paginationProps}
          />
        </Card>

        <Modal
          title="应用添加"
          className="standardListForm"
          width={640}
          bodyStyle={
            {
              padding: '28px 0',
            }
          }
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>

    );
  }
}

export default Form.create()(AppList);
