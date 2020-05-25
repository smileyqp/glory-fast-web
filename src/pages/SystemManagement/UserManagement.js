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
  Pagination
} from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserManagement.less';
import UserdetailDrawer from '@/components/SysManagement/UserdetailDrawer';
import AdduserDrawer from '@/components/SysManagement/AdduserDrawer';
import DetailMenu from '@/components/SysManagement/DetailMenu';
import UserlistColumn from '@/components/SysManagement/UserlistColumn';
import md5 from'md5';

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
    pagination: {
        pageSize:10,
        total:0
    },
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
        data:{...this.state.pagination},
        callback: res => {
          const pagination = { ...this.state.pagination };
          pagination.total = res.total;
          pagination.pageSize = res.pageSize;
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
      console.log(pagination)
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
          pagination.pageSize = res.pageSize;
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
        const formData = new FormData();
        formData.append('file', values.photo.file);
        const data = { ...values };
        data.photo = '';
        data.birthday = values.birthday._d;
        data.password = md5(data.password)
        console.log(data);
        const { dispatch } = this.props;
        dispatch({
          type: 'sysmanage/addUser',
          payload: {
            ...data,
          },
        });
      }
    });
  };
  
  handleCancel = () => {
    this.setState({ addDrawervisible: false });
  };

  render() {
    const {
      selectedRows,
      detailDrawervisible,
      addDrawervisible,
      imageUrl,
      photoloading,
      fileData,
      pagination,
    } = this.state;
    const { userlist, loading } = this.props;

    return (
      <PageHeaderWrapper title="用户管理">
        <UserdetailDrawer
          closeDetaildrawer={this.closeDetaildrawer}
          detailDrawervisible={detailDrawervisible}
        />
        <AdduserDrawer
          {...this.props}
          beforeUpload={this.beforeUpload}
          handleCancel={this.handleCancel}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          photoloading={photoloading}
          imageUrl={imageUrl}
          addDrawervisible={addDrawervisible}
          fileData={fileData}
        />

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
              pagination={pagination}
              dataSource={userlist && userlist.records}
              columns={UserlistColumn(styles, this.openDetailDrawer)}
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
