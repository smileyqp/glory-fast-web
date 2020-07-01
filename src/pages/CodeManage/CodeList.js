import React, { PureComponent, Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table, Button, Form ,message } from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import codemanage from '@/models/codemanage';
import styles from './CodeManage.less';
// import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'
import CodeModal from '@/components/CodeManagement/CodeModal'
import CodeConfigModal from '@/components/CodeManagement/CodeConfigModal'
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

@connect(({ codemanage, loading }) => ({
    codelist: codemanage.codelist,
    loading: loading.effects['codemanage/fetchCodelist'],
    genCodelist:codemanage.genCodelist,
    codeconfigloading:loading.effects['codemanage/fetchGencodelist']
}))
@Form.create()
class CodeList extends PureComponent {
    state = {
        pagination: {
            pageSize: 10,
            total: 0,
            pageNo: 1
        },
        selectedRows: [],
        addCodeVisible: false,
        editCodeVisible: false,
        codeconfigVisible:false,
        genCodelist:this.props.genCodelist,
        expandForm:false
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/fetchCurrent',
        });
        const data = {
            pageSize: 10,
            pageNo: 1,
        };
        this.refreshTable(data)
    }

    refreshTable = (paginationdata) => {
        const { dispatch } = this.props;
        const data = { ...paginationdata } || { ...this.state.pagination }
        dispatch({
            type: 'codemanage/fetchCodelist',
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

    addCode = () => {
        this.setState({ addCodeVisible: true })
    }
    cancelAddCode = () => {
        this.setState({ addCodeVisible: false })
        this.resetCodeForm()
    }


    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const data = {
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
        };
        this.refreshTable(data)
    };

    handleSubmit = (e) => {
        const { dispatch } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const data = { ...values }
            if (!err) {
                dispatch({
                    type: 'codemanage/addCode',
                    payload: {
                        ...values,
                        callback: (res) => {
                            this.setState({ addCodeVisible: false })
                            this.refreshTable()
                        }
                    }
                })
            }
        })
    }


    deleteCode = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        if (selectedRows.length === 0) {
            message.error("请选择一条信息")
            return;
        }
        const data = selectedRows.map((item) => {
            return item.id
        })

        dispatch({
            type: 'codemanage/deleteCode',
            payload: {
                data,
                callback: (res) => {
                    if (res.ok == true) {
                        message.success()
                        this.refreshTable()
                    }
                }
            }
        })
    }



    cancalEditCode = () => {
        this.setState({ editCodeVisible: false })
        this.resetCodeForm()
    }

    handleEdit = (e) => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const data = { ...values, id: this.state.editCodeId }
            if (!err) {
                dispatch({
                    type: 'codemanage/editCode',
                    payload: {
                        ...data,
                        callback: (res) => {
                            this.setState({ editCodeVisible: false })
                            this.refreshTable()
                        }
                    }
                })
            }
        })
    }

    resetCodeForm = () => {
        const { form } = this.props;
        form.resetFields()
    }

    editCode = (record) => {
        console.log(record)
        const { form } = this.props;
        this.setState({editCodeVisible:true,editCodeId:record.id})
        form.setFieldsValue({
            tableName: record.tableName,
            tableComment: record.tableComment,
            ifSon: record.ifSon,
            parentTable: record.parentTable,
            parentTableFk:record.parentTableFk,
            remarks:record.remarks,
          })
    }

    configCode = (record) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'codemanage/fetchGencodelist',
            payload: {
                genTableInfoId:record.id,
                callback: res => {
                    console.log(res)
                    console.log(res.result)
                    this.setState({genCodelist:res.result})
                    console.log(this.state.genCodelist)

                    this.setState({codeconfigVisible:true})
                },
            },
        });
        // dispatch({
        //     type: 'codemanage/fetchGencodelist',
        //     payload: {
        //         genTableInfoId:record.id,
        //         callback: (res) => {
        //             debugger
        //             console.log(res)
        //             console.log(res.result)
        //             this.setState({genCodelist:res.result})
        //             console.log(this.state.genCodelist)
        //         }
        //     }
        // })
        
        
        
    }

    cancelConfig = () => {
        this.setState({codeconfigVisible:false})
    }
    handleConfig = () => {
        debugger
        this.setState({codeconfigVisible:false})
    }

    

    saveGencodelist = (row) => {
        const { dispatch } = this.props;
        const newData = [...this.state.genCodelist];
        dispatch({
            type: 'codemanage/saveGencodelist',
            payload: {
                newData,
                callback: res => {
                    this.setState({codeconfigVisible:false})
                },
            },
        });


    }


    handleSave = row => {
        console.log(row)
        const {genCodelist} = this.state;
        const newData = [...genCodelist];
        const index = newData.findIndex(item => row.id === item.id)
      //  const index = newData.findIndex(item => row.id === item.id);
        console.log(index)
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ genCodelist: newData });
        console.log(this.state.genCodelist)
    };
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
        const { loading, codelist, form ,codeconfigloading} = this.props;
        const { getFieldDecorator } = form;
        const {
            selectedRows,
            pagination
        } = this.state;
        const columns = [
            {
                title: '序号',
                dataIndex: 'title',
                width: 80,
                render: (text, record, index) => `${index + 1}`,
            },
            {
                title: '表名',
                dataIndex: 'tableName',
                width: 100,
            },
            {
                title: '表注释',
                dataIndex: 'tableComment',
                width: 200,
            },
            {
                title: '实体类名称',
                dataIndex: 'clazzName',
                width: 100,
            },
            {
                title: '是否子表',
                dataIndex: 'ifSon',
                width: 100,
            },
            {
                title: '关联父表',
                dataIndex: 'parentTable',
                width: 100,
            },
            {
                title: '关联父表外键',
                dataIndex: 'parentTableFk',
                width: 100,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                width: 200,
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
                title: '操作',
                width: 120,
                render: (_, record) => {
                    return <Fragment>
                        <a onClick={() => { this.editCode(record) }}>编辑</a>
                        <span className="ant-divider" />
                        <a onClick={() => { this.configCode(record) }}>字段配置</a>
                        {/* <a >删除</a> */}
                    </Fragment>
                }
            }
        ]

        const searchColumns = [
            {label:'表名',dataIndex:'tableName'},
            {label:'表注释',dataIndex:'tableComment'},
            {label:'实体类名称',dataIndex:'clazzName'},
            {label:'是否子表',dataIndex:'ifSon'},
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

        const addCodeModal = (
            <CodeModal
                visible={this.state.addCodeVisible}
                cancleSubmit={this.cancelAddCode}
                handleSubmit={this.handleSubmit}
                form={form}
                title={'新增数据库表信息'}
            />
        )

        const editeCodeModal = (
            <CodeModal
                visible={this.state.editCodeVisible}
                cancleSubmit={this.cancalEditCode}
                handleSubmit={this.handleEdit}
                title={'修改数据库表信息'}
                form={form}
            />
        )

        const codeconfigModal = (
            <CodeConfigModal
                title = {'字段配置'}
                visible = {this.state.codeconfigVisible}
                cancleSubmit = {this.cancelConfig}
                handleSubmit = {this.handleConfig}
                genCodelist = {this.state.genCodelist}
                changeItem = {this.changeItem}
                loading={codeconfigloading}
                saveGencodelist = {this.saveGencodelist}
                handleSave = {this.handleSave}
            />
        )
        return (
            <PageHeaderWrapper>
                {addCodeModal}
                {editeCodeModal}
                {codeconfigModal}
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        {searchCon}
                        <div className={styles.topbuttons}>
                            <Button icon="plus" type="primary" onClick={this.addCode}>
                                添加
                            </Button>
                            <Button icon="delete" type="danger" onClick={this.deleteCode}>
                                批量删除
                            </Button>
                        </div>
                        <StandardTable
                            bordered
                            size="small"
                            scroll={{ x: 1200, y: 700 }}
                            selectedRows={selectedRows}
                            loading={loading}
                            pagination={pagination}
                            dataSource={codelist && codelist.records}
                            columns={columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                            rowKey="tableName"
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>

        );
    }
}

export default CodeList;
