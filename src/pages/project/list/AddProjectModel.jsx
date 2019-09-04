import React, { Component } from 'react';
import { Form, Input, message, Modal, Select } from 'antd';
import { CreateAppApi } from '../../../api/app';
import { CreateProjectApi } from '../../../api/project';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class AddProjectModel extends Component {
    static displayName = 'AddProjectModel';

    constructor(props) {
      super(props);
      this.state = {
        submitBtnLoading: false,
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
        submitBtnLoading: true,
      });
      await CreateProjectApi(fieldsValue).then((res) => {
        if (res.code === '200') {
          message.success('创建成功');
          this.props.onSubmitSuccess();
        }
      }).catch((error) => {
        console.error(error);
        message.error('操作失败');
      });
      await this.setState({
        submitBtnLoading: false,
      });
    });
  };

  render() {
    const { visible, form: { getFieldDecorator } } = this.props;
    const { submitBtnLoading } = this.state;
    return (
      <div>
        <Modal
          title="项目添加"
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
          okButtonProps={{ loading: submitBtnLoading }}
          onOk={this.handleSubmit}
          onCancel={this.props.onClose}
        >
          <Form>
            <FormItem label="项目名称" {...this.formLayout}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入应用名称',
                  },
                ],
              })(<Input placeholder="请输入应用名称" />)}
            </FormItem>
            <FormItem label="项目主页" {...this.formLayout}>
              {getFieldDecorator('homeUrl', {})(<Input placeholder="https://www.projecthome.html" />)}
            </FormItem>
            <FormItem {...this.formLayout} label="项目描述">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: '请输入至少五个字符的项目描述！',
                    min: 5,
                  },
                ],
              })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(AddProjectModel);
