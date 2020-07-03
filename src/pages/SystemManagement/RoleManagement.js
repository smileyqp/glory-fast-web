import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form ,Modal,Input,message} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import styles from './UserManagement.less';
import RoleModal from '@/components/SysManagement/RoleModal'
import RoleAuthorized from '@/components/SysManagement/RoleAuthorized'
import authorize from '@/components/Authorized/Secured';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

@connect(({ sysmanage, loading }) => ({
  rolelist:sysmanage.rolemanage.rolelist,
  permissionlist:sysmanage.permissionlistmanage.permissionlist,
  loading:loading.effects['sysmanage/fetchRoleList'],
}))
@Form.create()
class RoleManagement extends PureComponent {
  state = {
    pagination: {
      pageSize:10,
      total:0,
      pageNo:1
    },
    selectedRows:[],
    addRoleVisible:false,
    editRoleVisible:false,
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    codevalid:null
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type:'sysmanage/fetchPermissionList'
    })
    // dispatch({
    //   type:'sysmanage/fetchRoleList'
    // })
    const data = {
      pageSize: 10,
      pageNo: 1,
    };
    this.refreshTable(data)
  }
  refreshTable = (paginationdata) => {
    const {dispatch} = this.props;
    const data = {...paginationdata}||{...this.state.pagination}
    dispatch({
      type: 'sysmanage/fetchRoleList',
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

  addRole = () => {
    this.setState({addRoleVisible:true})
  }
  cancelAddRole = () => {
    this.setState({addRoleVisible:false,editRoleCode:null,codevalid:null})
    this.resetRoleForm()
  }


  validateCode = (code) => {
    const {dispatch} = this.props;
    console.log(code)
    if(this.state.editRoleCode === code){
      this.setState({codevalid:true})
    }else{
      dispatch({
        type:'sysmanage/validatecode',
        payload:{
          roleCode:code,
          callback:(res)=>{
            console.log(res)
            if(res.status ===200){
              this.setState({codevalid:true})
            }else{
              this.setState({codevalid:false})
            }
          }
        },
        
      })
    }
  
  }

  handleSubmit = (e) => {
      const {dispatch} = this.props;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
          const data = {...values}
          if (!err) {
              dispatch({
                  type:'sysmanage/addRole',
                  payload:{
                      ...values,
                      callback:(res)=>{
                          this.setState({addRoleVisible:false})
                          const data = {
                            pageSize: 10,
                            pageNo: 1,
                          };
                          this.refreshTable(data)
                      }
                  }
              })
        }
      })
  }

  deleteRole = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if(selectedRows.length === 0){
        message.error("请选择一条信息")
        return;
    }
    const data = selectedRows.map((item)=>{
        return item.id
    })

    dispatch({
        type:'sysmanage/deleteRole',
        payload:{
            data,
            callback:(res)=>{
              if(res.ok == true){
                message.success()
                const data = {
                  pageSize: 10,
                  pageNo: 1,
                };
                this.refreshTable(data)
              }
            }
        }
    })
  }

  editRole = (record) => {
    const { form } = this.props;
    this.setState({editRoleVisible:true,editRoleid:record.id,editRoleCode:record.roleCode})
    form.setFieldsValue({
      roleCode: record.roleCode,
      roleName: record.roleName,
      description: record.description,
      remarks: record.remarks
    })
  }

  roleAuthorized = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type:'sysmanage/fetchroleAuthorize',
      payload:{
        roleId:record.id,
        callback:res =>{
          console.log(res)
          this.setState({checkedKeys:res.result,authorizedVisible:true,authorizeid:record.id})
        }
      }
      
    })
  
  } 

  authorizeSubmit = (data) => {
    const {dispatch} = this.props;
    const {checkedKeys,authorizeid} = this.state;
    dispatch({
      type:'sysmanage/roleauthorize',
      payload:{
        data:{id:authorizeid,menus:checkedKeys},
        callback:(res)=>{
          console.log(res)
          if(res.status === 200){ 
            message.success('授权成功')
            this.authorizeCancel()
           }
        }
      }
    })
  }

  authorizeCancel = () => {
    this.setState({
      authorizedVisible:false, 
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: []
    })
  }
  
  cancalEditRole = () => {
    this.setState({editRoleVisible:false,editRoleCode:null,codevalid:null})
    this.resetRoleForm()
  }

  handleEdit = (e) => {
    const { dispatch , form } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        const data = {...values,id:this.state.editRoleid}
        if (!err) {
            dispatch({
                type:'sysmanage/editRole',
                payload:{
                    ...data,
                    callback:(res)=>{
                        this.setState({editRoleVisible:false})
                        const data = {
                          pageSize: 10,
                          pageNo: 1,
                        };
                        this.refreshTable(data)
                    }
                }
            })
      }
    })
  }

  resetRoleForm = () => {
    const { form } = this.props;
    form.resetFields()
  }



  onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  };

  render() {
    const {loading,rolelist,form} = this.props;
    const {getFieldDecorator} = form;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'title',
        width: 50,
        render:(text,record,index)=>`${index+1}`,
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        width: 100,
      },
      {
        title: '角色编码',
        dataIndex: 'roleCode',
        width: 100,
      },
      {
        title: '角色描述',
        dataIndex: 'description',
        width: 200,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 100,
      },
      {
        title: '创建人',
        dataIndex: 'createBy_text',
        width: 100,
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width: 200,
      },
      {
        title:'操作',
        width:70,
        render:(_,record)=>{
            return <Fragment>
                <a onClick= {()=>{this.editRole(record)}}>编辑</a>
                <span className="ant-divider" />
                <a onClick = {()=>{this.roleAuthorized(record)}}>授权</a>
            </Fragment>
        }
      }
    ]
  
    const roleAuthorizeModal = (
      <RoleAuthorized
        visible = {this.state.authorizedVisible}
        data = {this.props.permissionlist}
        handleSubmit = {this.authorizeSubmit}
        cancleSubmit = {this.authorizeCancel}

        expandedKeys = {this.state.expandedKeys}
        autoExpandParent = {this.state.autoExpandParent}
        checkedKeys = {this.state.checkedKeys}
        selectedKeys = {this.state.selectedKeys}

        onExpand = {this.onExpand}
        onCheck = {this.onCheck}
        onSelect = {this.onSelect}
      />
    )


  const addRoleModal = (
    <RoleModal
      visible = {this.state.addRoleVisible}
      cancleSubmit = {this.cancelAddRole}
      handleSubmit = {this.handleSubmit}
      validateCode = {this.validateCode}
      codevalid = {this.state.codevalid}
      form = {form}
      title = {'新增角色'}
    />
  )

  const editeRoleModal = (
    <RoleModal
      visible = {this.state.editRoleVisible}
      cancleSubmit = {this.cancalEditRole}
      handleSubmit = {this.handleEdit}
      validateCode = {this.validateCode}
      codevalid = {this.state.codevalid}
      title = {'修改角色'}
      form = {form}
    />
  )


  return (
    <PageHeaderWrapper>
        {roleAuthorizeModal}
        {addRoleModal}
        {editeRoleModal}
        <Card bordered={false}>
        <div className={styles.tableList}>
            <div className={styles.topbuttons}>
                <Button icon="plus" type="primary" onClick = {this.addRole}>
                添加
                </Button>
                <Button icon="delete" type="danger" onClick = {this.deleteRole}>
                批量删除
                </Button>
            </div>
                <StandardTable 
                  bordered
                  size="small"
                  selectedRows={selectedRows}
                  onSelectRow={this.handleSelectRows}
                  dataSource = {rolelist&&rolelist.records}
                  loading = {loading}
                  columns = {columns}
                  rowKey = {'id'}
                />
            </div>
            
        
        </Card>
    </PageHeaderWrapper>

    );
  }
}

export default RoleManagement;
