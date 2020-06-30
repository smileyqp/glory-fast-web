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

export default class DictListModal extends PureComponent {
  render() {
    const { form ,handleSubmit ,visible ,cancleSubmit ,editType,title,isparent} = this.props;
    const { getFieldDecorator } = form; 
    return (
        <Modal
            title = {title}
            visible={visible}
            onCancel={cancleSubmit}
            onOk={handleSubmit}
        >
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item
            label={
                <span>
                字典名称&nbsp;
                <Tooltip title="请输入字典名称">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('dictName', {
                rules: [{ required: true, message: '请输入字典名称!', whitespace: true }],
            })(<Input />)}
            </Form.Item>
            <Form.Item
            label={
                <span>
                字典代码&nbsp;
                <Tooltip title="请输入字典代码">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('dictCode', {
                rules: [{ required: true, message: '请输入字典代码!', whitespace: true }],
            })(<Input />)}
            </Form.Item>
            {!isparent &&<Form.Item
            label={
                <span>
                字典排序&nbsp;
                <Tooltip title="请输入字典排序">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('sortOrder', {
                rules: [{ required: false, message: '请输入字典排序!',}],
            })(<Input />)}
            </Form.Item>}

            <Form.Item label="描述">
            {getFieldDecorator('description', {
                rules: [
                {
                    required: false,
                    message: '请输入您的描述!',
                },
                ],
            })(<Input />)}
            </Form.Item>
            <Form.Item label="备注" >
            {getFieldDecorator('remarks', {
                rules: [
                {
                    required: false,
                    message: '请输入字典备注!',
                },
                ],
            })(<Input />)}
            </Form.Item>
        </Form>
      </Modal>
    );
  }
}
