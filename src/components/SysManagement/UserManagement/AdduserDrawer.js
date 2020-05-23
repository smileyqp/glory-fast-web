import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Card,
  Icon,
  Dropdown,
  Menu,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Cascader,
  AutoComplete,
  Checkbox,
} from 'antd';

import styles from './index.less';

class AdduserDrawer extends Component {
  static propTypes = {
    actionsText: PropTypes.object,
    hideCheckAll: PropTypes.bool,
  };

  static defaultProps = {
    hideCheckAll: false,
    actionsText: {
      expandText: 'Expand',
      collapseText: 'Collapse',
      selectAllText: 'All',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      value: props.value || props.defaultValue || [],
    };
  }

  render() {
    const { userlist, loading, form, addDrawervisible } = this.props;
    const { getFieldDecorator } = form;
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <Drawer
        title="新增"
        width={720}
        onClose={this.closeAdddrawer}
        visible={addDrawervisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={this.closeAdddrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={this.closeAdddrawer} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                用户账号&nbsp;
                <Tooltip title="您登陆账号?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('loginName', {
              rules: [{ required: true, message: '请输入登陆账号!', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                真实姓名&nbsp;
                <Tooltip title="您真实姓名?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入您真实姓名!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'E-mail不合法!',
                },
                {
                  required: true,
                  message: '请输入您的E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
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

          <Form.Item label="生日" rules={[{ required: true, message: '请选择日期' }]}>
            {getFieldDecorator('birthday', {
              rules: [{ required: true, message: '请选择您的生日!' }],
            })(
              <DatePicker
                style={{ width: '100%' }}
                getPopupContainer={trigger => trigger.parentNode}
              />
            )}
          </Form.Item>

          <Form.Item label="性别" rules={[{ required: true, message: 'Please select an owner' }]}>
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: '请选择您的性别!' }],
            })(
              <Select placeholder="请选择性别">
                <Option value={0}>男</Option>
                <Option value={1}>女</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="电话号码">
            {getFieldDecorator('telephone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              创建
            </Button>
            <Button>取消</Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}

export default AdduserDrawer;
