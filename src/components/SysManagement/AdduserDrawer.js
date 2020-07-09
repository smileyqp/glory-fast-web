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
  Card,
  Modal
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
const { Option } = Select;

export default class AdduserDrawer extends PureComponent {
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
    const {
      addDrawervisible,
      form,
      handleCancel,
      handleSubmit,
      handleChange,
      beforeUpload,
      imageUrl,
      photoloading,
      fileData,
      rolelist,
      isAdd
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


    const passwordContent = (
      <React.Fragment>
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
      </React.Fragment>
    )
    return (
      <Modal
        title={isAdd?'添加用户':'修改用户'}
        width={720}
        // onClose={handleCancel}
        visible={addDrawervisible}
        bodyStyle={{ paddingBottom: 80 }}
        onOk={handleSubmit}
        onCancel={handleCancel}
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
            
            {isAdd&&passwordContent}



            <Form.Item label="请选择用户角色" >
              {getFieldDecorator('roles', {
                rules: [
                  {
                    required: true,
                    message: '请选择用户角色!',
                  },
                ],
              })(
                <Select mode="tags" style={{ width: '100%' }} placeholder="用户角色">
                {rolelist&&rolelist.map((item)=>{
                  return  <Option key={item.id} value={item.id}>{item.roleName}</Option>
                })}
              </Select>,
              )}
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
          </Form>
      </Modal>
    );
  }
}
