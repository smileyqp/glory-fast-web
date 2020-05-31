import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form ,Modal,Input,message} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import sysmanage from '@/models/sysmanage';
import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'
import styles from './UserManagement.less';

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
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
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
      this.setState({addRoleVisible:false})
  }

  handleSubmit = (e) => {
      const {dispatch} = this.props;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
          console.log('Received values of form: ', values);
          const data = {...values}
          if (!err) {
              dispatch({
                  type:'sysmanage/addRole',
                  payload:{
                      ...values,
                      callback:(res)=>{
                          console.log(res)
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
              debugger
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


  render() {
    const {loading,rolelist,form} = this.props;
    const {getFieldDecorator} = form;
    const {selectedRows} = this.state;
    const columns = [
      {
        title: '序号',
        dataIndex: 'title',
        width: 80,
        render:(text,record,index)=>`${index+1}`,
        fixed: 'left',
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
        width: 200,
        fixed: 'left',
      },
      {
        title: '角色编码',
        dataIndex: 'roleCode',
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
        dataIndex: 'createBy_text',
        width: 200,
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width: 200,
      },
      {
        title:'操作',
        width:100,
        fixed:'right',
        render:()=>{
            return <Fragment>
                <a>编辑</a>
                {/* <span className="ant-divider" />
                <a >删除</a> */}
            </Fragment>
        }
      }
    ]
  //   return <PageHeaderWrapper>
  //     <Card bordered={false}>
  //      <StandardTable 
  //         size="middle"
  //         scroll={{ x: 1500, y: 700 }}
  //         selectedRows={selectedRows}
  //         onSelectRow={this.handleSelectRows}
  //         dataSource = {rolelist&&rolelist.records}
  //         loading = {loading}
  //         columns = {columns}
  //         rowKey = {'id'}
  //       />
  //     </Card>
  //   </PageHeaderWrapper>;

  const addRoleModal = (
        <Modal
        title="新增角色"
        visible={this.state.addRoleVisible}
        onCancel={this.cancelAddRole}
        onOk={this.handleSubmit}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
            label={
                <span>
                角色名称&nbsp;
                <Tooltip title="请输入角色名称">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('roleName', {
                rules: [{ required: true, message: '请输入角色名称!', whitespace: true }],
            })(<Input />)}
            </Form.Item>
            <Form.Item
            label={
                <span>
                角色编码&nbsp;
                <Tooltip title="请输入角色编码，不能重复">
                    <Icon type="question-circle-o" />
                </Tooltip>
                </span>
            }
            >
            {getFieldDecorator('roleCode', {
                rules: [{ required: true, message: '请输入角色编码!', whitespace: true }],
            })(<Input />)}
            </Form.Item>

            <Form.Item label="角色描述">
            {getFieldDecorator('description', {
                rules: [
                {
                    required: true,
                    message: '请输入您的描述!',
                },
                ],
            })(<Input />)}
            </Form.Item>
            <Form.Item label="备注" >
            {getFieldDecorator('remarks', {
                rules: [
                {
                    required: true,
                    message: '请输入角色备注!',
                },
                ],
            })(<Input />)}
            </Form.Item>
        </Form>
      </Modal>
    )


  return (
    <PageHeaderWrapper>
        {addRoleModal}
        <Card bordered={false}>
        <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
                <Button icon="plus" type="primary" onClick = {this.addRole}>
                添加
                </Button>
                <Button icon="plus" type="primary" onClick = {this.deleteRole}>
                批量删除
                </Button>
            </div>
                <StandardTable 
                    size="middle"
                    scroll={{ x: 1500, y: 700 }}
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
