import React, { Component } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  Menu,
  Modal,
  Radio,
  Result,
  Row,
  Select,
  Table,
} from 'antd';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import './style.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

class AppList extends Component {
  static displayName = 'AppList';

  constructor(props) {
    super(props);
    this.state = {
      cardLoading: false,
      visible: false,
      done: false,
      current: undefined,
    };
  }

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

  showEditModal = (item) => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
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
      this.setState({
        done: true,
      });
      dispatch({
        type: 'listBasicList/submit',
        payload: {
          id,
          ...fieldsValue,
        },
      });
    });
  };

  deleteItem = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listBasicList/submit',
      payload: {
        id,
      },
    });
  };

  renderStatus = (status) => {
    if (status === 'success') {
      return (
        <span>运行中</span>
      );
    }
    if (status === 'error') {
      return (
        <span>状态异常</span>
      );
    }
    if (status === 'default') {
      return (
        <span>已停止</span>
      );
    }
    if (status === 'processing') {
      return (
        <span>启动中</span>
      );
    }
    return (
      <span>未知状态</span>
    );
  };

  render() {
    const {
      cardLoading,
      visible, done, current = {},
    } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? {
        footer: null,
        onCancel: this.handleDone,
      }
      : {
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
        <Search className="extraContentSearch" placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const MoreBtn = ({ item }) => (
      <Dropdown
        overlay={(
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key="start">
              <Icon type="play-circle" style={{ color: 'green' }} />
              启动
            </Menu.Item>
            <Menu.Item key="stop">
              <Icon type="poweroff" style={{ color: '#ccc' }} />
              停止
            </Menu.Item>
            <Menu.Item key="restart">
              <Icon type="reload" style={{ color: 'blue' }} />
              重启
            </Menu.Item>
            <Menu.Item key="delete">
              <Icon type="delete" style={{ color: 'red' }} />
              删除
            </Menu.Item>
          </Menu>
        )}
      >
        <Button>
          更多
          <Icon type="down" />
        </Button>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            status="success"
            title="操作成功"
            subTitle="一系列的信息描述，很短同样也可以带标点。"
            extra={(
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            )}
            className="formResult"
          />
        );
      }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="应用名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入应用名称',
                },
              ],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [
                {
                  required: true,
                  message: '请选择开始时间',
                },
              ],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{
                  width: '100%',
                }}
              />,
            )}
          </FormItem>
          <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [
                {
                  required: true,
                  message: '请选择任务负责人',
                },
              ],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>,
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [
                {
                  message: '请输入至少五个字符的产品描述！',
                  min: 5,
                },
              ],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'appName',
        key: 'appName',
        render: (text, record) => (
          <div className="app-base-info">
            <Avatar src={record.logo} shape="square" size="large" style={{ marginRight: 16 }} />
            <div>
              <h4>
                <a href={record.href}>{record.appName}</a>
              </h4>
              <p className="desc">{record.subDescription}</p>
            </div>
          </div>
        ),
      },
      {
        title: 'owner',
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
        key: 'status',
        dataIndex: 'status',
        render: state => (
          <div>
            <Badge status={state} />
            {
              this.renderStatus(state)
            }
          </div>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>
              编辑
            </a>
            <Divider type="vertical" />
            <MoreBtn key="more" item={record} />
          </span>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        owner: 'John Brown',
        href: '',
        appName: 'Alipay',
        subDescription: '那是一种内在的东西， 他们到达不了，也无法触及的',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'New York No. 1 Lake Park',
        status: 'success',
      },
      {
        key: '2',
        owner: 'Jim Green',
        href: '',
        appName: 'Angular',
        subDescription: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'London No. 1 Lake Park',
        status: 'error',
      },
      {
        key: '3',
        owner: 'Joe Black',
        href: '',
        appName: 'Ant Design',
        subDescription: '生命就像一盒巧克力，结果往往出人意料',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'Sidney No. 1 Lake Park',
        status: 'default',
      },
      {
        key: '34',
        owner: 'Joe Black',
        href: '',
        appName: 'Ant Design Pro',
        subDescription: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
        lastSuccessTime: '2019-08-08 11:12:45',
        address: 'Sidney No. 1 Lake Park',
        status: 'processing',
      },
    ];

    return (
      <div className="standardList">
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
            showHeader={false}
            pagination={paginationProps}
          />
        </Card>

        <Modal
          title={done ? null : `应用${current ? '编辑' : '添加'}`}
          className="standardListForm"
          width={640}
          bodyStyle={
            done
              ? {
                padding: '72px',
              }
              : {
                padding: '28px',
              }
          }
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </div>

    );
  }
}

export default Form.create()(AppList);
