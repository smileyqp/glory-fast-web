import React, { PureComponent } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'

@connect(({ sysmanage,loading }) => ({
    permissionlist:sysmanage.permissionlistmanage.permissionlist,
    loading:loading.effects['sysmanage/fetchPermissionList']
}))
@Form.create()
class PermissionList extends PureComponent {
  state = {
    selectedRows:[],
    addDrawervisible:false
  }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
          type: 'user/fetchCurrent',
        });
        dispatch({
          type:'sysmanage/fetchPermissionList'
        })
    }

    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
    };

    closeAdddrawer = () => {
      this.setState({ addDrawervisible: false });
    };

    handleCancel = () => {
      this.setState({ addDrawervisible: false });
    };

    openAddDrawer = () => {
      console.log('00000')
      this.setState({ addDrawervisible: true });
    };



  render() {
    const {selectedRows ,addDrawervisible} = this.state;
    const {permissionlist,loading} = this.props;
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'title',
        width: 100,
        fixed: 'left',
      },
      {
        title: 'icon',
        dataIndex: 'icon',
        width: 200,
      },
      {
        title: '组件',
        dataIndex: 'component',
        width: 200,
      },
      {
        title: '路径',
        dataIndex: 'url',
        width: 200,
      },
      {
        title: '菜单类型',
        dataIndex: 'menuType',
        width: 200,
      },
      {
        title: '排序',
        dataIndex: 'sortNo',
        width: 200,
      },
      {
        title: '创建人',
        dataIndex: 'createBy',
        width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 100,
      },
      {
        title: '更新人',
        dataIndex: 'updateBy',
        width: 100,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 100,
      },
    ]
    return (
      <PageHeaderWrapper>
        <AddPermissionListDrawer
          {...this.props}
           closeAdddrawer={this.closeAdddrawer}
           addDrawervisible = {addDrawervisible}
           handleCancel = {this.handleCancel}
        />
        <Card bordered={false}>
        <Button icon="plus" type="primary" onClick = {this.openAddDrawer}>
          新建
        </Button>
        <StandardTable 
          size="middle"
          scroll={{ x: 1500, y: 300 }}
          selectedRows={selectedRows}
          onSelectRow={this.handleSelectRows}
          dataSource = {permissionlist&&permissionlist}
          loading = {loading}
          columns = {columns}
          rowKey = {'title'}
        />
        </Card>
      </PageHeaderWrapper>
   
    );
  }
}

export default PermissionList;
