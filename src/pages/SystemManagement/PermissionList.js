import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'
import styles from './UserManagement.less';

@connect(({ sysmanage,loading }) => ({
    permissionlist:sysmanage.permissionlistmanage.permissionlist,
    loading:loading.effects['sysmanage/fetchPermissionList']
}))
@Form.create()
class PermissionList extends PureComponent {
  state = {
    selectedRows:[],
    addDrawervisible:false,
    pagination:{
      pageSize:50,
      position:[
      {bottom:'none'}
      ]
    }
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
      this.setState({ addDrawervisible: true });
    };

    handleSubmit = (e) => {
      e.preventDefault();
      const { dispatch } = this.props;
      const { form } = this.props;
      form.validateFieldsAndScroll((err, values) => {
        console.log(values)
        dispatch({
          type:'sysmanage/addPermissionList',
          payload:{
            ...values,
            callback:(res)=>{
              console.log(res)
            }
          }
        })
      })
      
    }



  render() {
    const {selectedRows ,addDrawervisible,pagination} = this.state;
    const {permissionlist,loading} = this.props;
    console.log(permissionlist)
    const treelist = permissionlist&&permissionlist.map((item)=>{
      if(!item.children){
        return {
          title: item.name,
          value: item.id,
          key: item.key,
        }
      }else{
        const children = item.children.map((i)=>{
          return {
            title: i.name,
            value: i.id,
            key: i.key,
          }
        })
        return {
          title: item.name,
          value: item.id,
          key: item.key,
          children:children
        }
      }
    })
    console.log(treelist)
    const columns = [
      // {
      //   title: '序号',
      //   width: 80,
      //   render:(text,record,index)=>`${index+1}`,
      // },
      {
        title: '菜单名称',
        dataIndex: 'name',
        width: 150,
      },
      {
        title: 'icon',
        dataIndex: 'icon',
        width: 100,
      },
      {
        title: '组件',
        dataIndex: 'component',
        width: 200,
      },
      {
        title: '路径',
        dataIndex: 'url',
        width: 150,
      },
      {
        title: '菜单类型',
        dataIndex: 'menuType_text',
        width: 100,
      },
      {
        title: '排序',
        dataIndex: 'sortNo',
        width: 50,
      },
      // {
      //   title: '创建人',
      //   dataIndex: 'createBy',
      //   width: 100,
      // },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 200,
      },
      // {
      //   title: '更新人',
      //   dataIndex: 'updateBy',
      //   width: 100,
      // },
      // {
      //   title: '更新时间',
      //   dataIndex: 'updateTime',
      //   width: 200,
      // },
      {
        title: '操作',
        width:100,
        render:(_,record)=>{
          return  <Fragment>
                      <a  >编辑</a>
                      <span className="ant-divider" />
                      <a >删除</a>
                  </Fragment>
        }
      }
    ]
    return (
      <PageHeaderWrapper>
        <AddPermissionListDrawer
          {...this.props}
           closeAdddrawer={this.closeAdddrawer}
           addDrawervisible = {addDrawervisible}
           handleCancel = {this.handleCancel}
           handleSubmit = {this.handleSubmit}
            treeData = {treelist}
        />
        <Card bordered={false}>
          <div className={styles.tableList}>
              <div className={styles.topbuttons}>
                <Button icon="plus" type="primary" onClick = {this.openAddDrawer}>
                  新建
                </Button>
              </div>
              <StandardTable 
                bordered
                size="small"
                selectedRows={selectedRows}
                onSelectRow={this.handleSelectRows}
                dataSource = {permissionlist&&permissionlist}
                loading = {loading}
                columns = {columns}
                rowKey = {'name'}
                pagination={pagination}
              />
          </div>
        
       
        </Card>
      </PageHeaderWrapper>
   
    );
  }
}

export default PermissionList;
