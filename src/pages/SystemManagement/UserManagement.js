import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip ,Button, Badge,Divider} from 'antd';
import StandardTable from '@/components/StandardTable';
import numeral from 'numeral';
import { connect } from 'dva';
import { formatWan } from '@/utils/utils';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserManagement.less';
@connect(({ sysmanage,loading }) => ({
    userlist:sysmanage.usermanage.userlist,
    loading:loading.models.sysmanage
}))
class UserManagement extends PureComponent {
    state = {
        selectedRows:[],
        loading:false
    }
    columns = [
        {
          title: '用户姓名',
          dataIndex: 'username',
          width: 100,
          fixed:'left'
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
          width: 100,
        },
        {
          title: '性别',
          dataIndex: 'sex',
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
            width: 100,
        },
        {
            title: '删除状态',
            dataIndex: 'delFlag',
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
        
        // {
        //   title: '上次调度时间',
        //   dataIndex: 'updatedAt',
        //   sorter: true,
        //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        // },
        {
          title: '操作',
          render: (text, record) => (
            <Fragment>
              <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
              <Divider type="vertical" />
              <a href="">订阅警报</a>
            </Fragment>
          ),
          width: 200,
          fixed:'right'
        },
      ];
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
          type: 'user/fetchCurrent',
        });
        dispatch({type:'sysmanage/fetchUserList'})
    }
  render() {
    const { selectedRows,data } = this.state;
    const {
        userlist={userlist},
        loading
    } = this.props;
    console.log(userlist)
    //const {total,records} = this.props.userlist
    console.log(this.props)

    return (
        <PageHeaderWrapper title="用户管理">
             <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}></div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" >
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
                //   pagination = {total}
                dataSource={userlist.records}
                columns={this.columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
                rowKey='id'
            />
          </div>
        </Card>
        
        </PageHeaderWrapper>
   
    );
  }
}

export default UserManagement;

