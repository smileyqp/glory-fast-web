import React, { PureComponent, Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table, Button, Form ,message} from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import codemanage from '@/models/codemanage';
import styles from './CodeManage.less';
// import AddPermissionListDrawer from '@/components/SysManagement/AddPermissionListDrawer'
import CodeModal from '@/components/CodeManagement/CodeModal'

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
    loading: loading.effects['codemanage/fetchCodelist']
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
        editCodeVisible: false
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
                    debugger
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

    createCode = (record) => {
        console.log(record)
    }

    render() {
        const { loading, codelist, form } = this.props;
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
                fixed: 'left',
            },
            {
                title: '表名',
                dataIndex: 'tableName',
                width: 200,
                fixed: 'left',
            },
            {
                title: '表注释',
                dataIndex: 'tableComment',
                width: 200,
            },
            {
                title: '实体类名称',
                dataIndex: 'clazzName',
                width: 200,
            },
            {
                title: '是否子表',
                dataIndex: 'ifSon',
                width: 200,
            },
            {
                title: '关联父表',
                dataIndex: 'parentTable',
                width: 200,
            },
            {
                title: '关联父表外键',
                dataIndex: 'parentTableFk',
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
                title: '操作',
                width: 200,
                fixed: 'right',
                render: (_, record) => {
                    return <Fragment>
                        <a onClick={() => { this.editCode(record) }}>编辑</a>
                        <span className="ant-divider" />
                        <a onClick={() => { this.createCode(record) }}>字段配置</a>
                        {/* <a >删除</a> */}
                    </Fragment>
                }
            }
        ]

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

        return (
            <PageHeaderWrapper>
                {addCodeModal}
                {editeCodeModal}
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={this.addCode}>
                                添加
                            </Button>
                            <Button icon="plus" type="primary" onClick={this.deleteCode}>
                                批量删除
                            </Button>
                        </div>
                        <StandardTable
                            size="middle"
                            scroll={{ x: 1500, y: 700 }}
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
