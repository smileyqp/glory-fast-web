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
import moment from 'moment'

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
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
        width='600px'
      >
        <Form {...formItemLayout} onSubmit={handleSubmit}>

            <Form.Item
            label={
                <span>
                学生姓名&nbsp;
                <Tooltip title="请输入学生姓名">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('studentName', {
                rules: [{ required: true, message: '请输入学生姓名!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                学生编号&nbsp;
                <Tooltip title="请输入学生编号">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('studentNo', {
                rules: [{ required: true, message: '请输入学生编号!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            <Form.Item
            label={
                <span>
                身份证&nbsp;
                <Tooltip title="请输入身份证">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('idCard', {
                rules: [{ required: true, message: '请输入身份证!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item label={
                <span>
                生日&nbsp;
                <Tooltip title="请选择生日">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            rules={[{ required: true, message: '请选择日期' }]}>
            {getFieldDecorator('birthday', {
                rules: [{ required: true, message: '请选择您的生日!' }],
            })(
                <DatePicker
                style={{ width: '100%' }}
                getPopupContainer={trigger => trigger.parentNode}
                />
            )}
            </Form.Item>

            <Form.Item
            label={
                <span>
                性别&nbsp;
                <Tooltip title="请选择性别">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('sex', {
                rules: [{ required: false, message: '请选择性别!', whitespace: true }],
            })( <Select
                placeholder="选择性别"
                allowClear
              >
                <Option value="男">男</Option>
                <Option value="女">女</Option>
                <Option value="其他">其他</Option>
              </Select>)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                爱好&nbsp;
                <Tooltip title="请选择爱好">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('hobby', {
                rules: [{ required: false, message: '请选择爱好!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                电话&nbsp;
                <Tooltip title="请输入电话">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('phone', {
                rules: [{ required: false, message: '请输入电话!', whitespace: false }],
            })(<Input />)}
            </Form.Item>

            <Form.Item
            label={
                <span>
                介绍&nbsp;
                <Tooltip title="请输入介绍">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('description', {
                rules: [{ required: false, message: '请输入介绍!', whitespace: true }],
            })(<Input />)}
            </Form.Item>


            {/* <Form.Item
            label={
                <span>
                最后登录时间&nbsp;
                <Tooltip title="请选择最后登录时间">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('lastLoginTime', {
                rules: [{ required: false, message: '请选择最后登录时间!', whitespace: true }],
            })(<Input />)}
            </Form.Item> */}

            <Form.Item label={
                <span>
                最后登录时间&nbsp;
                <Tooltip title="请选择最后登录时间">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            } 
            rules={[{ required: true, message: '请选择最后登录时间' }]}>
            {getFieldDecorator('lastLoginTime', {
                rules: [{ required: true, message: '请选择最后登录时间!' }],
            })(
                <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
                getPopupContainer={trigger => trigger.parentNode}
                />
            )}
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
