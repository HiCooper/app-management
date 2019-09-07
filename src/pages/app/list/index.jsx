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
import './style.less';
import { Link } from 'react-router-dom';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { CreateAppApi, ListAppApi } from '../../../api/app';
import CacheService from '../../../cacheService';
import { getColorByWord } from '../../../util/sys';

const { Option } = Select;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search, TextArea } = Input;


const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['已关闭', '启动中', '运行中', '异常'];

class AppList extends Component {
  static displayName = 'AppList';

  constructor(props) {
    super(props);
    this.state = {
      appListData: [],
      pageSize: 10,
      total: 0,
      tableLoading: true,
      visible: false,
      createAppBtnLoading: false,
      current: undefined,
      projectOption: [],
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

  initData = async () => {
    ListAppApi().then((res) => {
      if (res.code === '200') {
        this.setState({
          appListData: res.data && res.data.records,
          total: res.data.total,
          tableLoading: false,
        });
      }
    });
    const projectOption = await CacheService.getProjectOption();
    this.setState({
      projectOption,
    });
  };

  showCreateAppModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  handleDone = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
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
    const { form } = this.props;
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      await this.setState({
        createAppBtnLoading: true,
      });
      await CreateAppApi(fieldsValue).then((res) => {
        if (res.code === '200') {
          this.openNotificationWithIcon('success', '应用添加成功',
            <div>
              <span style={{ color: 'green', fontWeight: '600', marginRight: '8px' }}>
                {fieldsValue.appName}
              </span>
              已创建，配置后可用
            </div>);
          this.handleDone();
          this.initData();
        }
      });
      await this.setState({
        createAppBtnLoading: false,
      });
    });
  };

  render() {
    const { tableLoading, visible, current, appListData, pageSize, total, createAppBtnLoading, projectOption } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize,
      total,
    };

    const Info = ({ title, value, bordered, state }) => (
      <div className="headerInfo">
        <Badge status={state} />
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
        <Search className="extraContentSearch" placeholder="请输入应用名称/所属项目/所有者" onSearch={() => ({})} />
      </div>
    );

    const onChange = (value) => {
      console.log(`selected ${value}`);
    };

    const onSearch = (val) => {
      console.log('search:', val);
    };

    const columns = [
      {
        title: '应用名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          const firstWord = record.name.substr(0, 1);
          return (
            <div className="app-base-info">
              <Avatar shape="square"
                size="large"
                style={{ marginRight: 16, verticalAlign: 'middle', background: getColorByWord(firstWord) }}
              >
                {firstWord}
              </Avatar>
              <div>
                <h4>
                  <Link to={`/app/detail?appId=${record.id}`}>{record.name}</Link>
                </h4>
                <div className="desc">{record.description}</div>
              </div>
            </div>
          );
        },
      },
      {
        title: '所属项目',
        dataIndex: 'projectName',
        key: 'project',
      },
      {
        title: '所有者',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '上次启动成功时间',
        dataIndex: 'lastSuccessTime',
        sorter: true,
        key: 'lastSuccessTime',
      },
      {
        title: '运行状态',
        key: 'state',
        dataIndex: 'state',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/app/config?appId=${record.id}`}>配置</Link>
            <Divider type="vertical" />
            <Link to={`/app/detail?appId=${record.id}`}>详情</Link>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper className="standardList">
        <Card bordered={false}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="运行中" value="8个" bordered state="success" />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="已停止" value="32" bordered state="default" />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="状态异常" value="24个" state="error" />
            </Col>
          </Row>
        </Card>

        <Card
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
            onClick={this.showCreateAppModal}
          >
            添加
          </Button>
          <Table
            loading={tableLoading}
            rowKey="id"
            columns={columns}
            dataSource={appListData}
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
          okText="保存"
          okButtonProps={{ loading: createAppBtnLoading }}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="应用名称" {...this.formLayout}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                  },
                ],
              })(<Input placeholder="请输入应用名称" />)}
            </FormItem>
            <FormItem label="git(SSH)仓库地址" {...this.formLayout}>
              {getFieldDecorator('gitUrl', {
                rules: [
                  {
                    required: true,
                    message: '请输入git仓库地址(SSH)!',
                  },
                ],
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
              })(
                <Select
                  showSearch
                  placeholder="请选择所属项目"
                  onChange={onChange}
                  onSearch={onSearch}
                >
                  {
                    projectOption && projectOption.length > 0 ? projectOption.map((item, index) => {
                      return (<Option value={item.id} key={index}>{item.name}</Option>);
                    }) : null
                  }
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
        </Modal>
      </PageHeaderWrapper>

    );
  }
}

export default Form.create()(AppList);
