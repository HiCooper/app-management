import React, { Component } from 'react';
import '@ant-design/compatible/assets/index.css';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './style.scss';
import DocumentTitle from 'react-document-title';
import { LoginApi } from '../../../api/user';
import { setToken, setUserInfo } from '../../../util/auth';

const layout = {
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};
export default class Login extends Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = {
      loginBtnLoading: false,
    };
  }

  handleSubmit = async (values) => {
    await this.setState({
      loginBtnLoading: true,
    });
    await LoginApi(values).then((res) => {
      if (res.code === '200') {
        setUserInfo(JSON.stringify(res.data.userInfo));
        setToken(res.data.token);
        message.success('登陆成功');
        this.props.history.push('/');
      }
    });
  };

  render() {
    const onFinish = (values) => {
      console.log('Success:', values);
      this.handleSubmit(values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const { loginBtnLoading } = this.state;
    return (
      <DocumentTitle title="用户登陆-应用运行监控系统">
        <div className="login-home">
          <div className="login-top">
            <span className="title">应用运行监控系统</span>
            <p className="desc">登录</p>
          </div>

          <Form
            className="login-form"
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loginBtnLoading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </DocumentTitle>
    );
  }
}
