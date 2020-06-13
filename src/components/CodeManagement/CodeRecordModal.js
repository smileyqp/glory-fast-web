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
                记录名称&nbsp;
                <Tooltip title="请输入记录名称">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('recordName', {
                rules: [{ required: true, message: '请输入记录名称!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                分类&nbsp;
                <Tooltip title="请选择分类">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('genType', {
                rules: [{ required: true, message: '请选择分类!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            <Form.Item
            label={
                <span>
                生成包路径&nbsp;
                <Tooltip title="请输入生成包路径">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('packageName', {
                rules: [{ required: true, message: '请输入生成包路径!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            <Form.Item
            label={
                <span>
                分类&nbsp;
                <Tooltip title="请输入生成模块名">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('genType', {
                rules: [{ required: true, message: '请输入生成模块名!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            <Form.Item
            label={
                <span>
                功能名称&nbsp;
                <Tooltip title="请输入功能名称">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('moduleDesc', {
                rules: [{ required: true, message: '请输入功能名称!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            <Form.Item
            label={
                <span>
                生成功能作者&nbsp;
                <Tooltip title="请输入生成功能作者">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('moduleAuthor', {
                rules: [{ required: true, message: '请输入生成功能作者!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            <Form.Item
            label={
                <span>
                生成表&nbsp;
                <Tooltip title="请选择表(主子表只选择主表)">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('genTableInfoId', {
                rules: [{ required: true, message: '请选择表(主子表只选择主表)!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item label="备注" >
            {getFieldDecorator('remarks', {
                rules: [
                {
                    required: true,
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
