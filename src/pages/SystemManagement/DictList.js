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
@connect(({ sysmanage,loading }) => ({
    dictlist:sysmanage.dictmanage.dictlist,
    loading:loading.effects['sysmanage/fetchDictList']
}))
@Form.create()
class DictList extends PureComponent {
    state = {
        pagination: {
            pageSize:10,
            total:0,
            pageNo:1
        },
        selectedRows:[],
        addDictVisible:false
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
          type: 'user/fetchCurrent',
        });
        this.refreshTable()
    }

    refreshTable = (paginationdata) => {
        const {dispatch} = this.props;
        const data = {...paginationdata}||{...this.state.pagination}
        dispatch({
          type: 'sysmanage/fetchDictList',
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

    addDict = () => {
        this.setState({addDictVisible:true})
    }
    cancelAddDict = () => {
        this.setState({addDictVisible:false})
    }
   
    handleSubmit = (e) => {
        const {dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('Received values of form: ', values);
            const data = {...values}
            if (!err) {
                dispatch({
                    type:'sysmanage/addDict',
                    payload:{
                        ...values,
                        callback:(res)=>{
                            console.log(res)
                            this.setState({addDictVisible:false})
                            this.refreshTable()
                        }
                    }
                })

          }
        })
    }

    deleteDict = () => {
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
            type:'sysmanage/deleteDict',
            payload:{
                data,
                callback:(res)=>{
                    console.log(res)
                    message.success()
                    this.refreshTable()
                }
            }
        })
    }


    render() {
        const {dictlist,loading,form} = this.props;
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
                        {/* <span className="ant-divider" />
                        <a >删除</a> */}
                    </Fragment>
                }
            }
         
        ]


        const addDictModal = (
            <Modal
            title="新增字典主表"
            visible={this.state.addDictVisible}
            onCancel={this.cancelAddDict}
            onOk={this.handleSubmit}
          >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                label={
                    <span>
                    字典名称&nbsp;
                    <Tooltip title="请输入字典名称">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>
                }
                >
                {getFieldDecorator('dictName', {
                    rules: [{ required: true, message: '请输入字典名称!', whitespace: true }],
                })(<Input />)}
                </Form.Item>
                <Form.Item
                label={
                    <span>
                    字典代码&nbsp;
                    <Tooltip title="请输入字典代码">
                        <Icon type="question-circle-o" />
                    </Tooltip>
                    </span>
                }
                >
                {getFieldDecorator('dictCode', {
                    rules: [{ required: true, message: '请输入字典代码!', whitespace: true }],
                })(<Input />)}
                </Form.Item>

                <Form.Item label="描述">
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
                        message: '请输入字典备注!',
                    },
                    ],
                })(<Input />)}
                </Form.Item>
            </Form>
          </Modal>
        )
   
        
        return (
        <PageHeaderWrapper>
            {addDictModal}
            <Card bordered={false}>
            <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                    <Button icon="plus" type="primary" onClick = {this.addDict}>
                    添加
                    </Button>
                    <Button icon="plus" type="primary" onClick = {this.deleteDict}>
                    批量删除
                    </Button>
                </div>
                    <StandardTable 
                        size="middle"
                        scroll={{ x: 1500, y: 700 }}
                        selectedRows={selectedRows}
                        onSelectRow={this.handleSelectRows}
                        dataSource = {dictlist&&dictlist.records}
                        loading = {loading}
                        columns = {columns}
                        rowKey = {'dictName'}
                    />
                </div>
                
            
            </Card>
        </PageHeaderWrapper>
    
        );
    }
}

export default DictList;
