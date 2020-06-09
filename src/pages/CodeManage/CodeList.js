import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'

@connect(({ codemanage,loading }) => ({
    codelist:codemanage.codelist,
    loading:loading.effects['logmanage/fetchDebugloglist']
}))
@Form.create()
class CodeList extends PureComponent {
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
          type: 'codemanage/fetchCodelist',
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
        const {codelist,loading} = this.props;
        console.log(this.props)
        const {
            selectedRows,
            pagination
        } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'title',
                width: 80,
                render:(text,record,index)=>`${index+1}`,
                fixed: 'left',
              },
            {
              title: '表名',
              dataIndex: 'tableName',
              width: 200,
              fixed: 'left',
            },
            {
              title: '表注释',
              dataIndex: 'tableComment',
              width: 200,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                width: 200,
            },
            {
                title: '创建人',
                dataIndex: 'createBy',
                width: 200,
            },
        ]
   
        
        return (
        <PageHeaderWrapper>
            <Card bordered={false}>
                <StandardTable
                    size="middle"
                    scroll={{ x: 1500, y: 700 }}
                    selectedRows={selectedRows}
                    loading={loading}
                    pagination={pagination}
                    dataSource={codelist && codelist.records}
                    columns={columns}
                    onSelectRow={this.handleSelectRows}
                    onChange={this.handleStandardTableChange}
                    rowKey="tableName"
                />

            </Card>
        </PageHeaderWrapper>
    
        );
    }
}

export default CodeList;
