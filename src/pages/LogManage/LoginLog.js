import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'

@connect(({ logmanage,loading }) => ({
    loginloglist:logmanage.loginlog.loginloglist,
    loading:loading.effects['logmanage/fetchLoginloglist']
}))
@Form.create()
class LoginLog extends PureComponent {
    state = {
        pagination: {
            pageSize:10,
            total:0,
            pageNo:1
        },
        selectedRows:[]
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
          type: 'user/fetchCurrent',
        });
       
        this.refreshTable()
    }

    refreshTable = (paginationdata) => {
        const {dispatch} = this.props;
        const data = {...paginationdata}||{...this.state.pagination}
        dispatch({
          type: 'logmanage/fetchLoginloglist',
          payload: {
              ...data,
              callback: res => {
                  const pagination = { ...this.state.pagination };
                  pagination.total = res.result.total;
                  pagination.pageSize = res.result.pageSize;
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

    addDict = () => {
        
    }
    handleSelectRows = rows => {
        this.setState({
          selectedRows: rows,
        });
      };

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const data = {
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
        };
        this.refreshTable(data)
    };
    
   


    render() {
        const {loginloglist,loading} = this.props;
        const {
            selectedRows,
            pagination
        } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'title',
                width: 50,
                render:(text,record,index)=>`${index+1}`,
              },
            {
              title: '登录名',
              dataIndex: 'loginName',
              width: 100,
            },
            {
              title: '用户名',
              dataIndex: 'username',
              width: 100,
            },
            {
                title: '登录地址',
                dataIndex: 'loginAddr',
                width: 200,
            },
            {
                title: '登录时间',
                dataIndex: 'loginTime',
                width: 200,
            },
            {
              title: '登录IP',
              dataIndex: 'loginIp',
              width: 200,
            },
           
         
        ]
        console.log(loginloglist)
   
        
        return (
        <PageHeaderWrapper>
            <Card bordered={false}>
                <Table
                    bordered
                    size="middle"
                    selectedRows={selectedRows}
                    loading={loading}
                    pagination={pagination}
                    dataSource={loginloglist && loginloglist.records}
                    columns={columns}
                    onSelectRow={this.handleSelectRows}
                    onChange={this.handleStandardTableChange}
                    rowKey="id"
                />

            </Card>
        </PageHeaderWrapper>
    
        );
    }
}

export default LoginLog;
