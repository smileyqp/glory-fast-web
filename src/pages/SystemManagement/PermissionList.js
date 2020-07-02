import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form,Popconfirm} from 'antd';
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
      ],
    },
    expandAll:false
  }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
          type: 'user/fetchCurrent',
        });
        this.refreshTable()
    }
    refreshTable = () => {
      const {dispatch} = this.props;
      dispatch({
        type:'sysmanage/fetchPermissionList'
      })
    }

    handleSelectRows = rows => {
      this.setState({
        selectedRows: rows,
      });
    };


    handleCancel = () => {
      this.setState({ addDrawervisible: false });
    };
    cancelEdit = () => {
      this.setState({editVisible:false})
    }

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
              this.setState({addDrawervisible:false})
              this.refreshTable()
            }
          }
        })
      })
      
    }

    // expandAll = () => {
    //   const {expandAll} = this.state;
    //   if(expandAll){
    //     this.setState({expandRoll:[]})
    //   }else{
    //     const data = this.props.permissionlist.map((item)=>{
    //       return item.name
    //     })
    //     this.setState({expandRoll:data})
    //   }
    //   this.setState({expandAll:!expandAll})
    // }

    editSubmit = (e) => {
      e.preventDefault();
      const { dispatch } = this.props;
      const { form } = this.props;
      form.validateFieldsAndScroll((err, values) => {
        console.log(values)
        const data = {...values,id:this.state.editid}
        dispatch({
          type:'sysmanage/editPermissionList',
          payload:{
            ...data,
            callback:(res)=>{
              console.log(res)
              this.setState({editVisible:false})
              this.refreshTable()
            }
          }
        })
      })
    }

    editlist = (record) => {
      console.log(record)
      const {form} = this.props;
      this.setState({editVisible:true})
      const {name,menuType_text,isLeaf,parentId,url,componentName,component,icon,sortNo} = record;
      form.setFieldsValue({
        name,menuType_text,isLeaf,parentId,url,componentName,component,icon,sortNo
      })
      this.setState({editid:record.id})
    }

    deletelist = (record) => {
      console.log(record)
      const {dispatch} = this.props;
      const data = [record.id]
      dispatch({
        type:'sysmanage/deletePermissionList',
        payload:{
          data,
          callback:(res)=>{
            console.log(res)
            this.refreshTable()
          }
        }
      })
    }



  render() {
    const {selectedRows ,addDrawervisible,pagination,editVisible} = this.state;
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
                      <a  onClick={()=>this.editlist(record)}>编辑</a>
                      <span className="ant-divider" />
                      <Popconfirm placement="top" title={'确认删除菜单?'} onConfirm={()=>this.deletelist(record)} okText="确认" cancelText="取消">
                        <a  style={{color:'red'}}>删除</a>
                      </Popconfirm>
                      
                  </Fragment>
        }
      }
    ]

    const addlist = (
      <AddPermissionListDrawer
          {...this.props}
          title={'新增'}
            visible = {addDrawervisible}
            handleCancel = {this.handleCancel}
            handleSubmit = {this.handleSubmit}
            treeData = {treelist}
        />
    )
    const editlist = (
      <AddPermissionListDrawer
          {...this.props}
            title={'修改'}
            visible = {editVisible}
            handleCancel = {this.cancelEdit}
            handleSubmit = {this.editSubmit}
            treeData = {treelist}
        />
    )
    return (
      <PageHeaderWrapper>
        {addlist}
        {editlist}
        <Card bordered={false}>
          <div className={styles.tableList}>
              <div className={styles.topbuttons}>
              {/* <Button icon={this.state.expandAll?"fullscreen-exit":"fullscreen" }onClick = {this.expandAll}>
                  {this.state.expandAll?"关闭全部":"展开全部"}
                </Button> */}
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
                defaultExpandAllRows = {true}
                //expandedRowKeys = {this.state.expandRoll}
              />
          </div>
        
       
        </Card>
      </PageHeaderWrapper>
   
    );
  }
}

export default PermissionList;
