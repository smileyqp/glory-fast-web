import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  Icon,
  Dropdown,
  Menu,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Cascader,
  AutoComplete,
  Checkbox,
  Upload,
  message,
  Pagination
} from 'antd';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserManagement.less';
import UserdetailDrawer from '@/components/SysManagement/UserdetailDrawer';
import AdduserDrawer from '@/components/SysManagement/AdduserDrawer';
import UserlistColumn from '@/components/SysManagement/UserlistColumn';
import GlobalSearch from '@/components/GlobalSearch/GlobalSearch'
import md5 from'md5';
import UpdatePasswordModal from '@/components/SysManagement/UpdatePasswordModal'
import moment from 'moment';
import {downloadFile} from '@/utils/utils'
import { formatDate } from 'umi-plugin-react/locale';
const dateFormat = 'YYYY/MM/DD';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}



@connect(({ sysmanage, loading }) => ({
  userlist: sysmanage.usermanage.userlist,
  rolelist:sysmanage.rolemanage.rolelist,
  loading: loading.effects['sysmanage/fetchUserList'],
}))
@Form.create()
class UserManagement extends PureComponent {
  state = {
    selectedRows: [],
    detailDrawervisible: false,
    addDrawervisible: false,
    photoloading: false,
    pagination: {
        pageSize:10,
        total:0,
        pageNo:1
    },
    updatePasswordVisible:false,
    updateUserVisible:false,
    expandForm:false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const data = {
      pageSize: 10,
      pageNo: 1,
    };
    dispatch({
      type: 'user/fetchCurrent',
    });
    this.refreshTable(data)
    dispatch({
      type: 'sysmanage/fetchRoleList',
      payload:{
      }
    });
  }
  


  refreshTable = (paginationdata) => {
      const {dispatch} = this.props;
      const data = {...paginationdata}||{...this.state.pagination}
      dispatch({
        type: 'sysmanage/fetchUserList',
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

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const data = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.refreshTable(data)
  };

  closeDetaildrawer = () => {
    this.setState({ detailDrawervisible: false });
  };

  openDetailDrawer = () => {
    this.setState({ detailDrawervisible: true });
  };

  openAddDrawer = () => {
    this.setState({ addDrawervisible: true });
  };

  enableUser = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0){
      message.error("请选择一条信息");
      return;
    }
    let row = selectedRows[0]
    const data = { id:row.id ,status : 1 };
    const { dispatch } = this.props;
    dispatch({
      type: 'sysmanage/disableUser',
      payload: {
        ...data,
        callback:(res)=>{
            if(res.ok == true){
                this.refreshTable()
            }
        }
      },
    });
  }
 
  uploadInfo = (info) => {
    console.log(info)
    const {dispatch} = this.props;
    const { fileList,file } = info;
    const formData = new FormData();
    formData.append('file',file.originFileObj)
    // fileList.forEach(file => {
    //   console.log(file)
    //   formData.append('files[]', file);
    // });
    console.log(formData)
    dispatch({
      type: 'sysmanage/uploadInfo',
      payload:{
        data:formData
      }
    })
  }
  
  disableUser = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0){
      message.error("请选择一条信息");
      return;
    }
    let row = selectedRows[0]
    const data = { id:row.id ,status : 2 };
    const { dispatch } = this.props;
    dispatch({
      type: 'sysmanage/disableUser',
      payload: {
        ...data,
        callback:(res)=>{
            if(res.ok == true){
                this.refreshTable()
            }
        }
      },
    });
    
  }

  deleteMore = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0){
      message.error("请选择一条信息");
      return;
    }
    const data = selectedRows.map((item) => {
      return item.id
    })  
    console.log(data)
    dispatch({
      type:'sysmanage/deleteUser',
      payload:{
        data,
        callback: (res) => {
          console.log(res)
          message.success(res.result)
          this.refreshTable()
        }
      },
    })
  }

  handleChange = info => {
    this.setState({ photoloading: true });
    getBase64(info.file.originFileObj, imageUrl =>
      this.setState({
        imageUrl,
        photoloading: false,
      })
    );
  };


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const formData = new FormData();
        formData.append('file', values.photo.file);
        const data = { ...values };
        data.photo = '';
        data.birthday = values.birthday._d;
        data.password = md5(data.password)
        const { dispatch } = this.props;
        dispatch({
          type: 'sysmanage/addUser',
          payload: {
            ...data,
            callback:(res) => {
                if(res.ok == true){
                    this.setState({addDrawervisible:false})
                    this.props.form.resetFields();
                    this.refreshTable()
                }
            }
          },
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({ addDrawervisible: false });
  };

  updatePassword = (record) => {
    this.setState({updatePasswordVisible:true,updateRecord:record})
  }

  updatePasswordSubmit = (password) => {
    const data = {...this.state.updateRecord,...password}
    const { dispatch } = this.props;
    dispatch({
      type: 'sysmanage/updateUser',
      payload: {
        ...data,
        callback:(res) => {
            if(res.status == 200){
                this.setState({updatePasswordVisible:false})
            }
        }
      },
    })
  }

  updatePasswordCancel = () => {
    this.setState({updatePasswordVisible:false})
  }

  editUser = (record) => {
    console.log(record)
    const { form } = this.props;
    this.setState({updateUserVisible:true,editUserRecord:record})
    form.setFieldsValue({
      telephone: record.telephone,
      sex: record.sex,
      email: record.email,
      loginName: record.loginName,
      username:record.username,
      birthday:record.birthday&&moment(record.birthday.replace(/-/g,'/'),dateFormat),
      roles:record.roles
    })
    this.setState({imageUrl:record.photo})
  }
  confirmeditUser = () => {
    const {form,dispatch} = this.props;
    form.validateFieldsAndScroll((err,values)=>{
      values.photo = 'testphoto';
      const data = {...this.state.editUserRecord,...values}
      console.log(data)
      console.log(values)
      dispatch({
        type: 'sysmanage/updateUser',
        payload: {
          ...data,
          callback:(res) => {
              if(res.status == 200){
                  this.setState({updateUserVisible:false,imageUrl:null})
                  form.resetFields()
                  this.refreshTable()
              }
          }
        },
      })
    })
  }
  
  cancelEdit = () => {
    this.setState({ updateUserVisible: false });
    const {form} = this.props;
    form.resetFields()
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
  handleSearch = (values) => {
    const { dispatch, form } = this.props;
    this.refreshTable(values)
  };

  render() {
    const {
      selectedRows,
      detailDrawervisible,
      addDrawervisible,
      imageUrl,
      photoloading,
      fileData,
      pagination,
      updateUserVisible
    } = this.state;
    const { userlist, loading ,rolelist} = this.props;
    const searchColumns = [
      {label:'用户姓名',dataIndex:'username'},
      {label:'用户账号',dataIndex:'loginName'},
      {label:'用户状态',dataIndex:'status_text'},
      {label:'电子邮件',dataIndex:'email'},
      {label:'电话',dataIndex:'phone'},
      {label:'性别',dataIndex:'sex',select:true,selectdata:[{value:'1',show:'男'},{value:'2',show:'女'}]},
    ]

    const updateUserModal = (
      <AdduserDrawer
        {...this.props}
        isAdd={false}
        beforeUpload={this.beforeUpload}
        handleCancel={this.cancelEdit}
        handleSubmit={this.confirmeditUser}
        handleChange={this.handleChange}
        photoloading={photoloading}
        imageUrl={imageUrl}
        addDrawervisible={updateUserVisible}
        fileData={fileData}
        rolelist = {rolelist&&rolelist.records}
        />
    )


    const searchCon = (
      <GlobalSearch
        handleSearch = {this.handleSearch}
        toggleForm = {this.toggleForm}
        expandForm = {this.state.expandForm}
        searchColumns = {searchColumns}
      />
    )
    return (
      <PageHeaderWrapper title="用户管理">
        {updateUserModal}
        <UserdetailDrawer
          closeDetaildrawer={this.closeDetaildrawer}
          detailDrawervisible={detailDrawervisible}
        />
        <UpdatePasswordModal
          visible = {this.state.updatePasswordVisible}
          handleSubmit = {this.updatePasswordSubmit}
          cancleSubmit = {this.updatePasswordCancel}
        />
        <AdduserDrawer
          isAdd = {true}
          {...this.props}
          beforeUpload={this.beforeUpload}
          handleCancel={this.handleCancel}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          photoloading={photoloading}
          imageUrl={imageUrl}
          addDrawervisible={addDrawervisible}
          fileData={fileData}
          rolelist = {rolelist&&rolelist.records}
        />





        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              {searchCon}
              <div className={styles.topbuttons}>
              <Button icon="plus" type="primary" onClick={this.openAddDrawer}>
                新建
              </Button>
              <Button icon="check" type="primary" onClick={this.enableUser}>
                启用
              </Button>
              <Button icon="stop" type="danger"  onClick={this.disableUser}>
                禁用
              </Button>
              <Button icon="delete" type="danger" onClick = {this.deleteMore}>
                  批量删除
              </Button>
              
              <Upload className={styles.upload} name='file' onChange = {this.uploadInfo} accept=".xls,.xlsx"><Button icon="upload"> 用户导入</Button></Upload>
              
              
              <Button icon="download" onClick={()=>{downloadFile("用户表.xls","/api/user/export")}}>
                用户导出
              </Button>
              </div>
            
              
            </div>
            <StandardTable
              bordered
              scroll={{ x: 1500 }}
              size="small"
              selectedRows={selectedRows}
              loading={loading} 
              pagination={pagination}
              dataSource={userlist && userlist.records}
              columns={UserlistColumn(styles, this.updatePassword,this.editUser,this.props.rolelist&&this.props.rolelist.records)}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              rowKey="id"
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserManagement;
