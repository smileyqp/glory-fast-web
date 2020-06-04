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
import DictListModal from '@/components/SysManagement/DictListModal'
import DictlistButtons from '@/components/SysManagement/DictlistButtons'
import { RightSquareFilled } from '@ant-design/icons';
import DictTable from '@/components/SysManagement/DictTable'

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
    loading:loading.effects['sysmanage/fetchDictList'],
    dictlistchild:sysmanage.dictmanage.dictlistchild,
    childloading:loading.effects['sysmanage/fetchChildDictList']
}))
@Form.create()
class DictList extends PureComponent {
    state = {
        pagination: {
            pageSize:10,
            total:0,
            pageNo:1
        },
        childpagination:{
            pageSize:10,
            total:0,
            pageNo:1
        },
        selectedRows:[],
        addDictVisible:false,
        editDictVisible:false,
        selectedRowid:null,
        selectedChildRowid:null,
        childbtnDisabled:true
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

    refreshChildTable = () => {
        const { dispatch } = this.props;
        const {selectedRowid } = this.state;
        const data = {...this.state.childpagination,dictId:selectedRowid}
        dispatch({
            type:'sysmanage/fetchChildDictList',
            payload: {
                ...data,
                callback: res => {
                    const pagination = { ...this.state.childpagination };
                    pagination.total = res.total;
                    pagination.pageSize = res.pageSize;
                    this.setState({ childpagination: pagination });
                },
            },
        })
    }

    handleSelectRows = rows => {
        this.setState({
          selectedRowid: rows.id,
          childbtnDisabled:false,
          selectedRowdata:rows
        });
        console.log(rows)
        console.log('ok')
        this.refreshChildTable()
      };
    handleSelectChildRows = (row) => {
        this.setState({selectedChildRowid:row.id,selectedChildRowdata:row})
    }

    addDict = () => {
        this.setState({addDictVisible:true})
    }

    addChildDict = () => {
        this.setState({addChildDictVisible:true})
    }
    cancelAddDict = () => {
        this.setState({addDictVisible:false})
        this.resetDictlistModal()
    }

    cancelAddChildDict = () => {
        this.setState({addChildDictVisible:false})
        this.resetDictlistModal()
    }
   
    handleSubmit = (e,type,id) => {
        console.log(type)
        console.log(id)
        const {dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('Received values of form: ', values);
            const data = {...values,dictId:id}||{...values}
            console.log(data)
            console.log(id)
            if (!err) {
                dispatch({
                    type,
                    payload:{
                        ...data,
                        callback:(res)=>{
                            console.log(res)
                            this.resetDictlistModal();
                            if(type === 'sysmanage/addDict'){
                                this.refreshTable()
                                this.setState({addDictVisible:false})
                            }else{
                                this.refreshChildTable()
                                this.setState({addChildDictVisible:false})
                            }
                            
                        }
                    }
                })
          }
        })
    }

    

    deleteDict = () => {
        const { dispatch } = this.props;
        const { selectedRowid } = this.state;
        if(selectedRowid === null){
            message.error("请选择一条信息")
            return;
        }
        const data = [selectedRowid]
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

    deleteChildDict = () => {
        const { dispatch } = this.props;
        const { selectedChildRowid } = this.state;
        if(selectedChildRowid === null){
            message.error("请选择一条信息")
            return;
        }
        const data = [selectedChildRowid]
        dispatch({
            type:'sysmanage/deleteChildDict',
            payload:{
                data,
                callback:(res)=>{
                    console.log(res)
                    message.success()
                    this.refreshChildTable()
                }
            }
        })
    }

    editSubmit = () => {
        const { dispatch } = this.props;
        const { editType } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('Received values of form: ', values);
            if(editType === 'parent'){
                const data = {...values,id:this.state.editid}
                if (!err) {
                    dispatch({
                        type:'sysmanage/updateDict',
                        payload:{
                            ...data,
                            callback:(res)=>{
                                console.log(res)
                                this.setState({editDictVisible:false})
                                this.resetDictlistModal();
                                this.refreshTable()
                            }
                        }
                    })
                }
            }else{
                const data = {...values,id:this.state.editid}
                data.itemText = data.dictName;
                data.dictId=data.dictCode;
                
                if (!err) {
                    dispatch({
                        type:'sysmanage/updateDict',
                        payload:{
                            ...data,
                            callback:(res)=>{
                                console.log(res)
                                this.setState({editDictVisible:false})
                                this.resetDictlistModal();
                                this.refreshTable()
                            }
                        }
                    })
                }
            }
            
        })
    }

    cancelEditDict = () => {
        this.setState({editDictVisible:false})
        this.resetDictlistModal()
    }

    editDictlist = (type) => {
        const { form } = this.props;
        const record = type === 'parent'?this.state.selectedRowdata:this.state.selectedChildRowdata;
        this.setState({editType:type})
        console.log(record)
        
        this.setState({editDictVisible:true,editid:record.id})
        form.setFieldsValue({
            dictName: record.dictName,
            dictCode: record.dictCode,
            description: record.description,
            remarks: record.remarks
          })
    }

    resetDictlistModal = () => {
        const { form } = this.props;
        form.resetFields()
      }
    


    render() {
        const {dictlist,loading,form,dictlistchild,childloading} = this.props;
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
                render:(_,record)=>{
                    return <Fragment>
                        <a onClick = {()=> {this.editDictlist(record)}}>编辑</a>
                        {/* <span className="ant-divider" />
                        <a >删除</a> */}
                    </Fragment>
                }
            }
         
        ]


        const addDictModal = (
            <DictListModal
                visible = { this.state.addDictVisible }
                cancleSubmit = {this.cancelAddDict }
                handleSubmit = { (e)=>{this.handleSubmit(e,'sysmanage/addDict')} }
                form = {form}
                title= {"新增字典主表"}
            />
        )

        const addChildDictModal = (
            <DictListModal
            visible = { this.state.addChildDictVisible }
            cancleSubmit = {this.cancelAddChildDict }
            handleSubmit = { (e)=>{this.handleSubmit(e,'sysmanage/addChildDict',this.state.selectedRowid)} }
            form = {form}
            title= {"新增字典子表"}
        />
        )

        const editDictModal = (
            <DictListModal
            visible = { this.state.editDictVisible }
            cancleSubmit = {this.cancelEditDict }
            handleSubmit = { this.editSubmit }
            form = {form}
            title= {"编辑字典主表"}
        />
        )

        const dictButtons = (
            <DictlistButtons 
                additem = { this.addDict }
                deleteitem = { this.deleteDict }
                styleclass = { styles.tableListOperator} 
                disable = {false}
                editItem = {()=>{this.editDictlist('parent')}}
            />
        )

        const childDictbtn = (
            <DictlistButtons 
                additem = { this.addChildDict }
                deleteitem = { this.deleteChildDict }
                styleclass = { styles.tableListOperator} 
                disable = {this.state.childbtnDisabled}
                editItem = {()=>{this.editDictlist('parent')}}
            />
        )
        
   
        
        return (
        <PageHeaderWrapper>
            {addDictModal}
            {addChildDictModal}
            {editDictModal}
            <Card bordered={false}>
                <div className={styles.tableList}>
                    {dictButtons}
                    <DictTable
                        dataSource = {dictlist&&dictlist.records}
                        loading = {loading}
                        columns = {columns}
                        handleSelect = {this.handleSelectRows}
                        type='parent'
                    />
                </div>
            </Card>

            <Card bordered={false}>
                <div className={styles.tableList}>
                    {childDictbtn}
                    <DictTable
                        dataSource = {dictlistchild&&dictlistchild.records}
                        loading = {childloading}
                        columns = {columns}
                        handleSelect = {this.handleSelectChildRows}
                        type='child'
                    />
                </div>
            </Card>


         
        </PageHeaderWrapper>
    
        );
    }
}

export default DictList;
