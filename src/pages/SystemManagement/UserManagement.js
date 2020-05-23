import React, { PureComponent, Fragment } from 'react';
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
  Upload,
  message,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserManagement.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

@connect(({ sysmanage, loading }) => ({
  userlist: sysmanage.usermanage.userlist,
  loading: loading.effects['sysmanage/fetchUserList'],
}))
@Form.create()
class UserManagement extends PureComponent {
  state = {
    selectedRows: [],
    detailDrawervisible: false,
    addDrawervisible: false,
    photoloading: false,
    pagination: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const data = {
      pageSize: 10,
      pageNo: 1,
    };
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'sysmanage/fetchUserList',
      payload: {
        ...data,
        callback: res => {
          const pagination = { ...this.state.pagination };
          pagination.total = res.total;
          this.setState({ pagination: pagination });
        },
      },
    });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    console.log(pagination, filtersArg, sorter);
    const data = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'sysmanage/fetchUserList',
      payload: {
        ...data,
        callback: res => {
          const pagination = { ...this.state.pagination };
          pagination.total = res.total;
          this.setState({ pagination: pagination });
        },
      },
    });
  };

  closeDetaildrawer = () => {
    this.setState({ detailDrawervisible: false });
  };
  openDetailDrawer = () => {
    this.setState({ detailDrawervisible: true });
  };
  closeAdddrawer = () => {
    this.setState({ addDrawervisible: false });
  };
  openAddDrawer = () => {
    this.setState({ addDrawervisible: true });
  };

  handleChange = info => {
    this.setState({ photoloading: true });
    getBase64(info.file.originFileObj, imageUrl =>
      this.setState({
        imageUrl,
        photoloading: false,
      })
    );
    //   console.log(info)
    // if (info.file.status === 'uploading') {
    //   this.setState({ photoloading: true });
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, imageUrl =>
    //     this.setState({
    //       imageUrl,
    //       photoloading: false,
    //     }),
    //   );
    //}
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致!');
    } else {
      callback();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const { dispatch } = this.props;
    // dispatch({
    //     type:'sysmanage',
    //     payload: {
    //         data,
    //         callback:()=>{

    //     }}
    // })
  };
  handleCancel = () => {
    this.setState({ addDrawervisible: false });
  };

  columns = menu => {
    return [
      {
        title: '用户姓名',
        dataIndex: 'username',
        width: 100,
        fixed: 'left',
      },
      {
        title: '用户账号',
        dataIndex: 'loginName',
        width: 120,
      },
      {
        title: '头像',
        dataIndex: 'photo',
        ellipsis: true,
        render: data => <img src={data} className={styles.userphoto} alt="头像" />,
        width: 100,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: data => {
          return data === 0 ? '男' : '女';
        },
        width: 100,
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 200,
      },
      {
        title: '手机号码',
        dataIndex: 'telephone',
        width: 200,
      },
      {
        title: '电子邮件',
        dataIndex: 'email',
        width: 220,
      },
      {
        title: '机构编码',
        dataIndex: 'orgCode',
        width: 100,
      },
      {
        title: '用户状态',
        dataIndex: 'status',
        render: data => {
          return data === 1 ? '启用' : '禁用';
        },
        width: 100,
      },
      {
        title: '删除状态',
        dataIndex: 'delFlag',
        render: data => {
          return data === 1 ? '正常使用' : '已删除';
        },
        width: 100,
      },
      {
        title: '工号',
        dataIndex: 'empNo',
        width: 100,
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 200,
      },
      {
        title: '更新人',
        dataIndex: 'updateBy',
        width: 100,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 200,
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width: 200,
      },
      {
        title: '删除时间',
        dataIndex: 'deleteTime',
        width: 100,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                更多 <Icon type="down" />
              </a>
            </Dropdown>
          </Fragment>
        ),
        width: 200,
        fixed: 'right',
      },
    ];
  };

  render() {
    const { selectedRows, detailDrawervisible, addDrawervisible, imageUrl } = this.state;
    const { userlist, loading, form } = this.props;
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

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={this.openDetailDrawer}>
            详情
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log('xiangqing');
            }}
          >
            密码
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log('xiangqing');
            }}
          >
            删除
          </a>
        </Menu.Item>
      </Menu>
    );

    const detailDrawer = (
      <Drawer
        title="详情"
        placement="right"
        closable={false}
        onClose={this.closeDetaildrawer}
        visible={detailDrawervisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );

    const uploadButton = (
      <div>
        <Icon type={this.state.photoloading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const addDrawer = (
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

    return (
      <PageHeaderWrapper title="用户管理">
        {detailDrawer}
        {addDrawer}
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.openAddDrawer}>
                新建
              </Button>
              {/* {selectedRows.length > 0 && (
                        <span>
                        <Button>批量操作</Button>
                        <Dropdown overlay={menu}>
                            <Button>
                            更多操作 <Icon type="down" />
                            </Button>
                        </Dropdown>
                        </span>
                    )} */}
            </div>
            <StandardTable
              scroll={{ x: 1500, y: 300 }}
              selectedRows={selectedRows}
              loading={loading}
              pagination={this.state.pagination}
              dataSource={userlist && userlist.records}
              columns={this.columns(menu)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              rowKey="id"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserManagement;
