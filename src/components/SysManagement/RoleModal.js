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
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

export default class RoleModal extends PureComponent {
  render() {
    const { form ,handleSubmit ,visible ,cancleSubmit ,title} = this.props;
    const { getFieldDecorator } = form; 
    return (
        <Modal
        title={title}
        visible={visible}
        onCancel={cancleSubmit}
        onOk={handleSubmit}
      >
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item
            label={
                <span>
                角色名称&nbsp;
                <Tooltip title="请输入角色名称">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('roleName', {
                rules: [{ required: true, message: '请输入角色名称!', whitespace: true }],
            })(<Input />)}
            </Form.Item>
            <Form.Item
            label={
                <span>
                角色编码&nbsp;
                <Tooltip title="请输入角色编码，不能重复">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('roleCode', {
                rules: [{ required: true, message: '请输入角色编码!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item label="角色描述">
            {getFieldDecorator('description', {
                rules: [
                {
                    required: true,
                    message: '请输入您的描述!',
                },
                ],
            })(<Input />)}
            </Form.Item>
            <Form.Item label="备注" >
            {getFieldDecorator('remarks', {
                rules: [
                {
                    required: true,
                    message: '请输入角色备注!',
                },
                ],
            })(<Input />)}
            </Form.Item>
        </Form>
      </Modal>
    );
  }
}
