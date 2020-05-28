import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'

@connect(({ sysmanage,loading }) => ({
    dictlist:sysmanage.dictmanage.dictlist,
    loading:loading.effects['sysmanage/fetchDictList']
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
        const {pageSize,pageNo} = this.state.pagination;
        dispatch({
          type:'sysmanage/fetchDictList',
          payload:{pageSize,pageNo}
        })
    }

    handleSelectRows = rows => {
        this.setState({
          selectedRows: rows,
        });
      };

    addDict = () => {
        
    }
   


    render() {
        const {dictlist,loading} = this.props;
        const {selectedRows} = this.state;
        const columns = [
            {
              title: '字典名称',
              dataIndex: 'dictName',
              width: 100,
              fixed: 'left',
            },
            {
              title: '字典代码',
              dataIndex: 'dictCode',
              width: 200,
            },
            {
                title: '描述',
                dataIndex: 'description',
                width: 200,
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                width: 200,
            },
            {
              title: '创建人',
              dataIndex: 'createBy',
              width: 200,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                width: 200,
            },
            {
                title: '更新人',
                dataIndex: 'updateBy',
                width: 200,
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                width: 200,
            },
            {
                title:'操作',
                width:100,
                fixed:'right',
                render:()=>{
                    return <Fragment>
                        <a>编辑</a>
                        <span className="ant-divider" />
                        <a>删除</a>
                    </Fragment>
                }
            }
         
        ]
   
        
        return (
        <PageHeaderWrapper>
            <Card bordered={false}>
           
            
            </Card>
        </PageHeaderWrapper>
    
        );
    }
}

export default LoginLog;
