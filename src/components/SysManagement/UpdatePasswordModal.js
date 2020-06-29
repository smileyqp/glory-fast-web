import React, { PureComponent } from 'react';
import {
  Menu,
  Drawer,
  Select,
  DatePicker,
  Tooltip,
  Cascader,
  AutoComplete,
  Checkbox,
  Upload,
  message,
  Input,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Icon
} from 'antd';
import classNames from 'classnames';


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

@Form.create()
export default class UpdatePasswordModal extends PureComponent {
    state = {
        confirmDirty: false,
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
     
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  render() {
    const { form ,handleSubmit ,visible ,cancleSubmit ,title} = this.props;
    const { getFieldDecorator } = this.props.form; 
    return (
        <Modal
        title={'修改密码'}
        visible={visible}
        onCancel={cancleSubmit}
        onOk={handleSubmit}
      >
        <Form {...formItemLayout} onSubmit={handleSubmit}>
             <Form.Item label="登陆密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入您的密码!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请验证您的密码!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
        </Form>
      </Modal>
    );
  }
}
