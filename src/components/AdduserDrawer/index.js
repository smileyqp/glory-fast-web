import React from 'react';
import { Icon, Drawer } from 'antd';
import classNames from 'classnames';

const AdduserDrawer = () => {
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

        <Form.Item label="头像">
          {/* {getFieldDecorator('photo')(
                    <Upload action='路径' 
                        listType="picture-card"
                        beforeUpload={beforeUpload} 
                        onChange={this.handleChange} 
                        onRemove={this.fileRemove} 
                        fileList={this.state.fileData}>
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                )} */}
          {getFieldDecorator('photo', {
            rules: [{ required: true, message: '请选择头像!' }],
          })(
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              fileList={this.state.fileData}
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
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

        {/* <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                    valuePropName: 'checked',
                })(
                    <Checkbox>
                    I have read the <a href="">agreement</a>
                    </Checkbox>,
                )}
            </Form.Item> */}
        <Form.Item {...tailFormItemLayout}>
          <Row gutter={16}>
            <Col span={6}>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Col>
            <Col span={6}>
              <Button onClick={this.handleCancel}>取消</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AdduserDrawer;
