import React, { PureComponent } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import numeral from 'numeral';
import { connect } from 'dva';
import { formatWan } from '@/utils/utils';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
@connect(({ sysmanage, loading }) => ({
  rolelist:sysmanage.rolemanage.rolelist,
  loading:loading.effects['sysmanage/fetchRoleList'],
}))
class RoleManagement extends PureComponent {
  state = {
    selectedRows:[]
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type:'sysmanage/fetchRoleList'
    })
  }
  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  render() {
    const {loading,rolelist} = this.props;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        width: 200,
        fixed: 'left',
      },
      {
        title: '角色描述',
        dataIndex: 'description',
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
      {
        title: '备注',
        dataIndex: 'remarks',
        width: 200,
      },
    ]
    return <PageHeaderWrapper>
      <Card bordered={false}>
       <StandardTable 
          size="middle"
          scroll={{ x: 1500, y: 300 }}
          selectedRows={selectedRows}
          onSelectRow={this.handleSelectRows}
          dataSource = {rolelist&&rolelist.records}
          loading = {loading}
          columns = {columns}
          rowKey = {'roleName'}
        />
      </Card>
    </PageHeaderWrapper>;
  }
}

export default RoleManagement;
