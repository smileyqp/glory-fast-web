import React, { PureComponent, Fragment } from 'react';
import { Card, Icon, Dropdown, Menu, Button, Drawer } from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserManagement.less';

@connect(({ sysmanage, loading }) => ({
  userlist: sysmanage.usermanage.userlist,
  loading: loading.models.sysmanage,
}))
class UserManagement extends PureComponent {
  state = {
    selectedRows: [],
    detailDrawervisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({ type: 'sysmanage/fetchUserList' });
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    console.log(pagination, filtersArg, sorter);
    dispatch({
      type: 'user/fetchCurrent',
    });
  };

  closeDetaildrawer = () => {
    this.setState({ detailDrawervisible: false });
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
    const { selectedRows } = this.state;
    const { userlist, loading } = this.props;

    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log('asdas');
              this.setState({ detailDrawervisible: true });
            }}
          >
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
    const detailDrawer = () => {
      const { detailDrawervisible } = this.state;
      return (
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
    };

    // const detailDrawer = (
    //   <Drawer
    //     title="详情"
    //     placement="right"
    //     closable={false}
    //     onClose={this.closeDetaildrawer}
    //     visible={this.state.detailDrawervisible}
    //   >
    //     <p>Some contents...</p>
    //     <p>Some contents...</p>
    //     <p>Some contents...</p>
    //   </Drawer>
    // );

    return (
      <PageHeaderWrapper title="用户管理">
        {detailDrawer}
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary">
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
            {userlist && (
              <StandardTable
                scroll={{ x: 1500, y: 300 }}
                selectedRows={selectedRows}
                loading={loading}
                //   pagination = {total}
                dataSource={userlist.records}
                columns={this.columns(menu)}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
                rowKey="id"
              />
            )}
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserManagement;
