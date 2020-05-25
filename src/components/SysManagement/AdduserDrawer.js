import React, { PureComponent } from 'react';
import {
  Icon,
  Drawer,
  Form,
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

export default class AdduserDrawer extends PureComponent {
  render() {
    const {
      closeAdddrawer,
      addDrawervisible,
      form,
      handleCancel,
      handleSubmit,
      handleChange,
      beforeUpload,
      imageUrl,
      photoloading,
      fileData,
    } = this.props;
    const { getFieldDecorator } = form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    );
    const uploadButton = (
      <div>
        <Icon type={photoloading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Drawer
        title="新增"
        width={720}
        onClose={closeAdddrawer}
        visible={addDrawervisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form {...formItemLayout} onSubmit={handleSubmit}>
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

          <Form.Item label="头像">
            {getFieldDecorator('photo', {
              rules: [{ required: true, message: '请选择头像!' }],
            })(
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                fileList={fileData}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            )}
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
                <Select.Option value={0}>男</Select.Option>
                <Select.Option value={1}>女</Select.Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="电话号码">
            {getFieldDecorator('telephone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Row gutter={16}>
              <Col span={6}>
                <Button type="primary" htmlType="submit">
                  创建
                </Button>
              </Col>
              <Col span={6}>
                <Button onClick={handleCancel}>取消</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }
}