import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon, Input, message } from 'antd';
import './style.scss';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import { LoginApi } from '../../../api/user';
import { setToken, setUserInfo } from '../../../util/auth';


class Login extends Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = {
      loginBtnLoading: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
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
        }).catch((error) => {
          console.error(error);
          message.error('登陆失败');
          this.setState({
            loginBtnLoading: false,
          });
        });
      }
    });
  };

  render() {
    const { loginBtnLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <DocumentTitle title="用户登陆-应用运行监控系统">
        <div className="login-home">
          <div className="login-top">
            <span className="title">应用运行监控系统</span>
            <p className="desc">登录</p>
          </div>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }],
                initialValue: 'admin',
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
                initialValue: '123456',
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('rememberMe', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Button type="primary" loading={loginBtnLoading} htmlType="submit" className="login-form-button">
                登录
              </Button>
              <span>或 </span>
              <Link to="/user/register">现在注册!</Link>
            </Form.Item>
          </Form>
        </div>
      </DocumentTitle>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'login' })(Login);
export default WrappedNormalLoginForm;
