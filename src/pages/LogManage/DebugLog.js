import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form,Popover} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'
import GlobalSearch from '@/components/GlobalSearch/GlobalSearch'

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
        selectedRows:[],
        expandForm:false
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
    
    toggleForm = () => {
        const { expandForm } = this.state;
        this.setState({
          expandForm: !expandForm,
        });
      };
  
      handleSearch = (values) => {
        const { dispatch, form } = this.props;
        this.refreshTable(values)
      }

      openDetails = (record) => {
        console.log(record)
        console.log(record.errorData)
      }

    render() {
        const {debugloglist,loading} = this.props;
        const {
            selectedRows,
            pagination
        } = this.state;
        // const content = (record) => {
        //   return( 
        //     this.render(<div>
        //     </div>)
        //   )
        // }
        const columns = [
            {
                title: '序号',
                dataIndex: 'title',
                width: 50,
                render:(text,record,index)=>`${index+1}`,
              },
            {
              title: '登录名',
              width: 100,
              render:(data)=>{return data.loginName||data.createBy}
            },
            {
              title: '用户名',
              dataIndex: 'username',
              width: 100,
            },
            {
                title: '异常类名',
                dataIndex: 'clazzName',
                width: 400,
            },
            {
                title: '异常方法名',
                dataIndex: 'postMethod',
                width: 200,
            },
            {
                title: '操作时间',
                dataIndex: 'createTime',
                width: 200,
            },{
              title:'操作',
              render:(_,record)=><Popover title={'错误数据'} content={<div style={{width:'1000px',height:'500px',overflow:'scroll'}}>{record.errorData}</div>} trigger="click"><a>错误详情</a></Popover>
            }
            // TODO 内容过长，需要处理
            // {
            //   title: '异常详情',
            //   dataIndex: 'errorData',
            //   width: 200,
            // },
           
         
        ]


        const searchColumns = [
            {label:'登录名',dataIndex:'loginName'},
            {label:'用户名',dataIndex:'username'},
            {label:'登录地址',dataIndex:'loginAddr'},
            {label:'登录时间',dataIndex:'loginTime'},
          ]
  
          const searchCon = (
            <GlobalSearch
              handleSearch = {this.handleSearch}
              toggleForm = {this.toggleForm}
              expandForm = {this.state.expandForm}
              searchColumns = {searchColumns}
            />
          )
   
        
        return (
        <PageHeaderWrapper>
            <Card bordered={false}>
            {searchCon}
                <Table
                    bordered
                    size="small"
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
