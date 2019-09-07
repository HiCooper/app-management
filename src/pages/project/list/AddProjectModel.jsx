import React, {Component} from 'react';
import {Form, Input, message, Modal} from 'antd';
import {CreateProjectApi} from '../../../api/project';
import CacheService from "../../../cacheService";

const FormItem = Form.Item;
const {TextArea} = Input;

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
    const {form} = this.props;
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
      });
      await this.setState({
        submitBtnLoading: false,
      });
      CacheService.cleanProjectOption();
    });
  };

  render() {
    const {visible, form: {getFieldDecorator}} = this.props;
    const {submitBtnLoading} = this.state;
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
          okButtonProps={{loading: submitBtnLoading}}
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
              })(<Input placeholder="请输入应用名称"/>)}
            </FormItem>
            <FormItem label="项目主页" {...this.formLayout}>
              {getFieldDecorator('homeUrl', {})(<Input placeholder="https://www.projecthome.html"/>)}
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
              })(<TextArea rows={4} placeholder="请输入至少五个字符"/>)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddProjectModel);
