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
    debugloglist:logmanage.debuglog.debugloglist,
    loading:loading.effects['logmanage/fetchDebugloglist']
}))
@Form.create()
class DebugLog extends PureComponent {
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
        // const {pageSize,pageNo} = this.state.pagination;
        // dispatch({
        //   type:'logmanage/fetchLoginloglist',
        //   payload:{pageSize,pageNo}
        // })
        this.refreshTable()
    }

    refreshTable = (paginationdata) => {
        const {dispatch} = this.props;
        const data = {...paginationdata}||{...this.state.pagination}
        dispatch({
          type: 'logmanage/fetchDebugloglist',
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
        const {debugloglist,loading} = this.props;
        const {
            selectedRows,
            pagination
        } = this.state;
        const columns = [
            {
              title: '登录名',
              dataIndex: 'loginName',
              width: 100,
              fixed: 'left',
            },
            {
              title: '用户名',
              dataIndex: 'username',
              width: 200,
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
   
        
        return (
        <PageHeaderWrapper>
            <Card bordered={false}>
                <StandardTable
                    scroll={{ x: 1500, y: 300 }}
                    selectedRows={selectedRows}
                    loading={loading}
                    pagination={pagination}
                    dataSource={debugloglist && debugloglist.records}
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

export default DebugLog;
