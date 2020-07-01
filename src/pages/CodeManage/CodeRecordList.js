import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form ,Modal,Input,message} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import codemanage from '@/models/codemanage';
import styles from './CodeManage.less';
import CodeRecordModal from '@/components/CodeManagement/CodeRecordModal' 
import GlobalSearch from '@/components/GlobalSearch/GlobalSearch'


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

// @connect(({ sysmanage, loading }) => ({
//   rolelist:sysmanage.rolemanage.rolelist,
//   loading:loading.effects['sysmanage/fetchCodeRecordlist'],
// }))
@connect(({ codemanage, loading }) => ({
  codeRecordlist:codemanage.codeRecordlist,
  loading:loading.effects['codemanage/fetchCodeRecordlist'],
}))



@Form.create()
class CodeRecordList extends PureComponent {
  state = {
    pagination: {
      pageSize:10,
      total:0,
      pageNo:1
    },
    selectedRows:[],
    addCodeRecordVisible:false,
    editCodeRecordVisible:false,
    expandForm:false
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
      type: 'codemanage/fetchCodeRecordlist',
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

  addCodeRecord = () => {
    this.setState({addCodeRecordVisible:true})
  }
  cancelAddCodeRecord = () => {
    this.setState({addCodeRecordVisible:false})
    this.resetCodeRecordForm()
  }

  handleSubmit = (e) => {
      const {dispatch} = this.props;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
          const data = {...values}
          if (!err) {
              dispatch({
                  type:'codemanage/addCodeRecord',
                  payload:{
                      ...values,
                      callback:(res)=>{
                          this.setState({addCodeRecordVisible:false})
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
        type:'codemanage/deleteCodeRecord',
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
    this.setState({editCodeRecordVisible:true,editCodeRecordId:record.id})
    form.setFieldsValue({
      roleCode: record.roleCode,
      roleName: record.roleName,
      description: record.description,
      remarks: record.remarks
    })
  }

  /* 生成代码功能 */
  createCode = (record) => {
    let row = record
    const data = { id:row.id};
    const { dispatch } = this.props;
    dispatch({
      type: 'codemanage/fetchCreateCodeFile',
      payload: {
        ...data,
        callback:(res)=>{
            if(res.ok == true){
                message.info(res.result);
                this.refreshTable()
            }
        }
      },
    });
  }
  
  cancalEditCodeRecord = () => {
    this.setState({editCodeRecordVisible:false})
    this.resetCodeRecordForm()
  }

  handleEdit = (e) => {
    const { dispatch , form } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
        const data = {...values,id:this.state.editCodeRecordId}
        if (!err) {
            dispatch({
                type:'codemanage/editCodeRecord',
                payload:{
                    ...data,
                    callback:(res)=>{
                        this.setState({editCodeRecordVisible:false})
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

  resetCodeRecordForm = () => {
    const { form } = this.props;
    form.resetFields()
  }
  handleSearch = (values) => {
    this.refreshTable(values)
  };

  toggleForm = () => {
      const { expandForm } = this.state;
      this.setState({
          expandForm: !expandForm,
      });
  };

  render() {
    const {loading,codeRecordlist,form} = this.props;
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
        title: '记录名称',
        dataIndex: 'recordName',
        width: 200,
        fixed: 'left',
      },
      {
        title: '分类',
        dataIndex: 'genType',
        width: 100,
      },
      {
        title: '生成包路径',
        dataIndex: 'packageName',
        width: 250,
      },
      {
        title: '生成模块名',
        dataIndex: 'moduleName',
        width: 200,
      },
      {
        title: '功能名称',
        dataIndex: 'moduleDesc',
        width: 200,
      },
      {
        title: '生成功能作者',
        dataIndex: 'moduleAuthor',
        width: 120,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 200,
      },
      {
        title: '创建人',
        dataIndex: 'createBy_text',
        width: 120,
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        width: 200,
      },
      {
        title:'操作',
        width:200,
        fixed:'right',
        render:(_,record)=>{
            return <Fragment>
                <a onClick= {()=>{this.editRole(record)}}>编辑</a>
                <span className="ant-divider" />
                <a onClick= {()=>{this.createCode(record)}}>生成代码</a>
                {/* <a >删除</a> */}
            </Fragment>
        }
      }
    ]


    const searchColumns = [
      {label:'记录名称',dataIndex:'recordName'},
      {label:'分类',dataIndex:'genType'},
      {label:'模块名称',dataIndex:'moduleName'},
      {label:'功能名称',dataIndex:'clazzName'},
      {label:'创建人',dataIndex:'createBy_text'},
      {label:'备注',dataIndex:'remarks'},
    ]
    const searchCon = (
    <GlobalSearch
        handleSearch = {this.handleSearch}
        toggleForm = {this.toggleForm}
        expandForm = {this.state.expandForm}
        searchColumns = {searchColumns}
    />
    )


  const addCodeRecordModal = (
    <CodeRecordModal
      visible = {this.state.addCodeRecordVisible}
      cancleSubmit = {this.cancelAddCodeRecord}
      handleSubmit = {this.handleSubmit}
      form = {form}
      title = {'新增记录'}
    />
  )

  const editeCodeRecordModal = (
    <CodeRecordModal
      visible = {this.state.editCodeRecordVisible}
      cancleSubmit = {this.cancalEditCodeRecord}
      handleSubmit = {this.handleEdit}
      title = {'修改记录'}
      form = {form}
    />
  )


  return (
    <PageHeaderWrapper>
        {addCodeRecordModal}
        {editeCodeRecordModal}
        <Card bordered={false}>
        <div className={styles.tableList}>
          {searchCon}
            <div className={styles.topbuttons}>
                <Button icon="plus" type="primary" onClick = {this.addCodeRecord}>
                添加
                </Button>
                <Button icon="delete" type="danger" onClick = {this.deleteRole}>
                批量删除
                </Button>
            </div>
                <StandardTable 
                  bordered
                  size="small"
                  scroll={{ x: 1500, y: 700 }}
                  selectedRows={selectedRows}
                  onSelectRow={this.handleSelectRows}
                  dataSource = {codeRecordlist&&codeRecordlist.records}
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

export default CodeRecordList;
