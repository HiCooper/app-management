import React, { Component } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class SearchForm extends Component {
  static displayName = 'SearchForm';

  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      // do fetch List
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    // do fetch List
  };

  onChange = (value) => {
    console.log(`selected ${value}`);
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="search-form">
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row
            gutter={{
              md: 8,
              lg: 24,
              xl: 48,
            }}
          >
            <Col md={8} sm={24}>
              <FormItem label="全局搜索">
                {getFieldDecorator('keyword')(<Input placeholder="请输入名称/ip" />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="免密登录">
                {getFieldDecorator('state')(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择"
                    onChange={this.onChange}
                  >
                    <Option value="success">成功</Option>
                    <Option value="fail">失败</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className="submitButtons">
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
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(SearchForm);
