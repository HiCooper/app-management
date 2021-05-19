import React, { Component } from 'react';
import { Form, Input, message, Modal } from 'antd';
import { CreateServerApi } from '../../../../api/server';

const FormItem = Form.Item;

const { TextArea } = Input;

export default class AddServerModal extends Component {
  static displayName = 'AddServerModal';

  constructor(props) {
    super(props);
    this.state = {
      addServerBtnLoading: false,
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      await this.setState({
        addServerBtnLoading: true,
      });
      await CreateServerApi(fieldsValue).then((res) => {
        if (res.code === '200') {
          message.success('服务器添加成功');
          this.props.submitSuccess();
        }
      });
      await this.setState({
        addServerBtnLoading: false,
      });
    });
  };

  render() {
    const { addServerBtnLoading } = this.state;
    return (
      <div>
        <Modal
          title="服务器添加"
          className="standardListForm"
          width={640}
          bodyStyle={
            {
              padding: '28px 0',
            }
          }
          destroyOnClose
          visible={this.props.visible}
          okText="保存"
          okButtonProps={{ loading: addServerBtnLoading }}
          onOk={this.handleSubmit}
          onCancel={this.props.onClose}
        >
          <Form>
            <FormItem label="服务器名称" {...this.formLayout}>
              <Input placeholder="请输入服务器名称" />
            </FormItem>
            <FormItem label="ip" {...this.formLayout}>
              <Input placeholder="127.0.0.1" />
            </FormItem>
            <FormItem {...this.formLayout} label="服务器描述">
              <TextArea rows={4} placeholder="请输入至少五个字符" />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
