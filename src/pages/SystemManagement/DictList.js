import React, { PureComponent,Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table ,Button ,Form ,Modal,Input,message,Divider} from 'antd';
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

    refreshChildTable = (selectedRowid,values) => {
        const { dispatch } = this.props;
        const data = {...this.state.childpagination,dictId:selectedRowid,...values}
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
        this.refreshChildTable(rows.id)
      };
    handleSelectChildRows = (row) => {
        this.setState({selectedChildRowid:row.id,selectedChildRowdata:row})
    }

    addDict = () => {
        this.setState({addDictVisible:true,title:'添加字典主表'})
    }

    addChildDict = () => {
        this.setState({addChildDictVisible:true,title:'添加字典子表'})
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
        const {dispatch} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                if(type === 'sysmanage/addDict'){
                    const data = {...values}
                    dispatch({
                        type,
                        payload:{
                            ...data,
                            callback:(res)=>{
                                this.resetDictlistModal();
                                this.refreshTable()
                                this.setState({addDictVisible:false})
                            }
                        }
                    })
                }else if(type === 'sysmanage/addChildDict'){
                    const data = {dictId:id,itemText:values.dictName,itemValue:values.dictCode,remarks:values.remarks,description:values.description,sortOrder:values.sortOrder}
                    dispatch({
                        type,
                        payload:{
                            ...data,
                            callback:(res)=>{
                                console.log(res)
                                this.resetDictlistModal();
                                console.log('bbb')
                                this.refreshChildTable(this.state.selectedRowid)
                                this.setState({addChildDictVisible:false})
                                
                            }
                        }
                    })
                }
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
                    this.refreshChildTable(this.state.selectedRowid)
                }
            }
        })
    }

    editSubmit = () => {
        const { dispatch } = this.props;
        const { isparent } = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log('Received values of form: ', values);
            if(isparent){
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
                data.dictId= this.state.selectedRowid;
                data.itemValue = data.dictCode;
                if (!err) {
                    dispatch({
                        type:'sysmanage/updateChildDict',
                        payload:{
                            ...data,
                            callback:(res)=>{
                                console.log(res)
                                this.setState({editDictVisible:false})
                                this.resetDictlistModal();
                                this.refreshChildTable(this.state.selectedRowid)
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
        this.setState({isparent:type==='parent'?true:false})
        console.log(record)
        if(!record){
            message.warning('请至少选择一项')
            return
        }
        this.setState({editDictVisible:true,editid:record.id,title:type==='parent'?'编辑字典主表':'编辑字典子表'})
        form.setFieldsValue({
            dictName:type==='parent'? record.dictName:record.itemText,
            dictCode:type==='parent'? record.dictCode:record.itemValue,
            description: record.description,
            remarks: record.remarks
          })
    }

    resetDictlistModal = () => {
        const { form } = this.props;
        form.resetFields()
      }

      toggleParentForm = () => {
        const { expandParentForm } = this.state;
        this.setState({
            expandParentForm: !expandParentForm,
        });
      };


      toggleChildForm = () => {
        const { expandChildForm } = this.state;
        this.setState({
            expandChildForm: !expandChildForm,
        });
      };

      handleSearchParent = (values) => {
        this.refreshTable(values)
      }
    
      handleSearchChild = (values) => {
        this.refreshChildTable(this.state.selectedRowid,values)
      }


    render() {
        const {dictlist,loading,form,dictlistchild,childloading} = this.props;
        const {getFieldDecorator} = form;
        const {selectedRows} = this.state;
        const searchParentColumns = [
            {label:'字典名称',dataIndex:'dictName'},
            {label:'创建人',dataIndex:'createBy_text'},
            {label:'描述',dataIndex:'description'},
            {label:'备注',dataIndex:'remarks'},
          ]
        const searchChildColumns = [
            {label:'名称',dataIndex:'itemText'},
            {label:'值',dataIndex:'itemValue'},
            {label:'排序',dataIndex:'sortOrder'},
            {label:'描述',dataIndex:'description'},
            {label:'备注',dataIndex:'remarks'},
            {label:'创建人',dataIndex:'createBy_text'},
        ]





        const addDictModal = (
            <DictListModal
                visible = { this.state.addDictVisible }
                cancleSubmit = {this.cancelAddDict }
                handleSubmit = { (e)=>{this.handleSubmit(e,'sysmanage/addDict')} }
                form = {form}
                isparent = {true}
                title= {this.state.title}
            />
        )

        const addChildDictModal = (
            <DictListModal
            visible = { this.state.addChildDictVisible }
            cancleSubmit = {this.cancelAddChildDict }
            handleSubmit = { (e)=>{this.handleSubmit(e,'sysmanage/addChildDict',this.state.selectedRowid)} }
            form = {form}
            isparent={false}
            title= {this.state.title}
        />
        )

        const editDictModal = (
            <DictListModal
            visible = { this.state.editDictVisible }
            cancleSubmit = {this.cancelEditDict }
            handleSubmit = { this.editSubmit }
            form = {form}
            title = {this.state.title}
            isparent = {this.state.isparent}
        />
        )
        
        const dictButtons = (
            <DictlistButtons 
                additem = { this.addDict }
                deleteitem = { this.deleteDict }
                styleclass = { styles.tableListOperator} 
                disable = {false}
                editItem = {()=>{this.editDictlist('parent')}}
                styleclass = {styles.topbuttons}

            />
        )

        const childDictbtn = (
            <DictlistButtons 
                additem = { this.addChildDict }
                deleteitem = { this.deleteChildDict }
                styleclass = { styles.tableListOperator} 
                disable = {this.state.childbtnDisabled}
                editItem = {()=>{this.editDictlist('child')}}
                styleclass = {styles.topbuttons}
            />
        )

        const searchParentCon = (
            <GlobalSearch
              handleSearch = {this.handleSearchParent}
              toggleForm = {this.toggleParentForm}
              expandForm = {this.state.expandParentForm}
              searchColumns = {searchParentColumns}
            />
          )

          const searchChildCon = (
            <GlobalSearch
              handleSearch = {this.handleSearchChild}
              toggleForm = {this.toggleChildForm}
              expandForm = {this.state.expandChildForm}
              searchColumns = {searchChildColumns}
            />
          )
        
   
        
        return (
        <PageHeaderWrapper>
            {addDictModal}
            {addChildDictModal}
            {editDictModal}
            <Card bordered={false}>
                <div className={styles.tableList}>
                {searchParentCon}
                    {dictButtons}
                    <DictTable
                        dataSource = {dictlist&&dictlist.records}
                        loading = {loading}
                        handleSelect = {this.handleSelectRows}
                        type='parent'
                    />
                </div>
            {!this.state.childbtnDisabled&&<Divider />}

            </Card>
            {!this.state.childbtnDisabled&&<Card bordered={false}>
                <div className={styles.tableList}>
                    {searchChildCon}
                    {childDictbtn}
                    <DictTable
                        dataSource = {dictlistchild&&dictlistchild.records}
                        loading = {childloading}
                        handleSelect = {this.handleSelectChildRows}
                        type='child'
                    />
                </div>
            </Card>}


         
        </PageHeaderWrapper>
    
        );
    }
}

export default DictList;
