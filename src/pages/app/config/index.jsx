import React, { Component } from 'react';
import { Alert, Button, Card, Divider, Form, Icon, Input, Modal, Select, Tooltip } from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';

import './style.less';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class AppConfig extends Component {
  static displayName = 'AppConfig';

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'formBasicForm/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  handleChange = (value) => {
    console.log(`selected ${value}`);
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

  deleteAppModalShow = (key, currentItem) => {
    Modal.confirm({
      title: '删除应用',
      content: '确定删除该应用吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => this.deleteItem(currentItem.id),
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 10,
        },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 10,
          offset: 7,
        },
      },
    };

    const onChange = (value) => {
      console.log(`selected ${value}`);
    };

    const onSearch = (val) => {
      console.log('search:', val);
    };

    return (
      <PageHeaderWrapper className="app-config-home">
        <Card bordered={false}>
          <Alert
            message="注意"
            description="1. 自定义运行目录请确保部署服务器上该目录存在"
            type="info"
            showIcon
          />
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <Form
            onSubmit={this.handleSubmit}
            style={{
              marginTop: 8,
            }}
          >
            <div className="title">基本信息</div>
            <FormItem
              {...formItemLayout}
              label="应用名称"
            >
              {getFieldDecorator('appName', {
                rules: [
                  {
                    required: true,
                    message: '应用名称不能为空',
                  },
                ],
              })(
                <Input
                  placeholder="请输入应用名称"
                />,
              )}
            </FormItem>
            <FormItem label="所属项目" {...formItemLayout}>
              {getFieldDecorator('projectId', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属项目!',
                  },
                ],
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
            <FormItem
              {...formItemLayout}
              label="应用描述"
            >
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用描述!',
                  },
                ],
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  placeholder="请输入应用描述"
                  rows={4}
                />,
              )}
            </FormItem>
            <Divider
              style={{
                marginBottom: 32,
              }}
            />
            <div className="title">部署信息</div>
            <FormItem
              {...formItemLayout}
              label="构建脚本"
            >
              {getFieldDecorator('buildShell', {
                rules: [
                  {
                    required: true,
                    message: '请输入构建脚本!',
                  },
                ],
              })(
                <TextArea
                  style={{
                    minHeight: 32,
                  }}
                  placeholder="请输入构建脚本(将源代码打包成 jar 或者 war)"
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  自定义运行目录
                  <em style={{ fontStyle: 'normal', color: '#AAA' }}>
                    （选填）
                    <Tooltip title="请确保部署服务器上该目录存在">
                      <Icon
                        type="info-circle-o"
                        style={{
                          marginRight: 4,
                        }}
                      />
                    </Tooltip>
                  </em>
                </span>
              )}
            >
              {getFieldDecorator('customRunPath', {})(
                <Input
                  placeholder="请输入运行目录(确保部署服务器上该目录存在)"
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="部署服务器"
            >
              {getFieldDecorator('deployServer', {
                rules: [
                  {
                    required: true,
                    message: '请选择部署服务器!',
                  },
                ],
                initialValue: ['192.168.2.123'],
              })(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="select one country"
                  onChange={this.handleChange}
                  optionLabelProp="label"
                >
                  <Option value="192.168.2.123" label="192.168.2.123 (司南)">
                    192.168.2.123 (司南)
                  </Option>
                  <Option value="192.168.2.124" label=" 192.168.2.124 (四库)">
                    192.168.2.124 (四库)
                  </Option>
                  <Option value="192.168.2.125" label="192.168.2.125 (洛书)">
                    192.168.2.124 (洛书)
                  </Option>
                  <Option value="192.168.2.126" label=" 192.168.2.126 (八卦)">
                    192.168.2.124 (八卦)
                  </Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...submitFormLayout}
              style={{
                marginTop: 32,
              }}
            >
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
              >
                保存
              </Button>
            </FormItem>
          </Form>
          <Button type="danger" onClick={this.deleteAppModalShow} style={{ float: 'right' }}>
            删除应用
          </Button>
        </Card>


      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(AppConfig);
