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

export default class CodeModal extends PureComponent {
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
                数据库表名&nbsp;
                <Tooltip title="请选择数据库表">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('tableName', {
                rules: [{ required: true, message: '请选择数据库表!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                表注释&nbsp;
                <Tooltip title="请输入表注释">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('tableComment', {
                rules: [{ required: true, message: '请输入数据库表!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                是否子表&nbsp;
                <Tooltip title="请选择是否是子表">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('ifSon', {
                rules: [{ required: false, message: '请选择是否是子表!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                关联父表&nbsp;
                <Tooltip title="请选择关联父表">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('parentTable', {
                rules: [{ required: false, message: '请选择关联父表!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                关联父表外键&nbsp;
                <Tooltip title="请输入关联父表外键">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('parentTableFk', {
                rules: [{ required: false, message: '请输入关联父表外键!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            
            <Form.Item label="备注" >
            {getFieldDecorator('remarks', {
                rules: [
                {
                    required: false,
                    message: '请输入备注!',
                },
                ],
            })(<Input />)}
            </Form.Item>
        </Form>
      </Modal>
    );
  }
}
