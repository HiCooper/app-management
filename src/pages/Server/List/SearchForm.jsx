import React, { Component } from 'react';
import '@ant-design/compatible/assets/index.css';
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;


export default class SearchForm extends Component {
  static displayName = 'SearchForm';

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  handleFormReset = () => {
    this.setState({
      formValues: {},
    });
    // do fetch List
  };

  onChange = (value) => {
    console.log(`selected ${value}`);
  };

  render() {
    const onFinish = (values) => {
      console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const { formValues } = this.state;
    return (
      <div className="search-form">
        <Form layout="inline"
          initialValues={formValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="全局搜索" name="keyword">
            <Input placeholder="请输入名称/ip" />
          </Form.Item>
          <Form.Item label="免密登录" name="noPass">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择"
              onChange={this.onChange}
            >
              <Option value="success">成功</Option>
              <Option value="fail">失败</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button
            style={{
              marginLeft: 8,
            }}
            onClick={this.handleFormReset}
          >
            重置
          </Button>
        </Form>
      </div>
    );
  }
}
