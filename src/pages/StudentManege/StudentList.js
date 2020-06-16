import React, { PureComponent, Fragment } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip, Table, Button, Form ,message } from 'antd';
import numeral from 'numeral';
import StandardTable from '@/components/StandardTable';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatWan } from '@/utils/utils';
import studentmanage from '@/models/studentmanage';
import styles from './StudentList.less';
import StudentModal from './StudentModal'

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

@connect(({ studentmanage, loading }) => ({
    studentlist: studentmanage.studentlist,
    loading: loading.effects['studentmanage/fetchStudentList']
}))
@Form.create()
class StudentList extends PureComponent {
    state = {
        pagination: {
            pageSize: 10,
            total: 0,
            pageNo: 1,
        },
        selectedRows: [],
        addStudentVisible: false,
        editStudentVisible: false,
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
            type: 'studentmanage/fetchStudentList',
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

    addStudent = () => {
        this.setState({ addStudentVisible: true })
    }
    cancelAddStudent = () => {
        this.setState({ addStudentVisible: false })
        this.resetStudentForm()
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
                    type: 'studentmanage/fetchAddStudent',
                    payload: {
                        ...values,
                        callback: (res) => {
                            this.setState({ addStudentVisible: false })
                            this.refreshTable()
                        }
                    }
                })
            }
        })
    }


    deleteStudent = () => {
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
            type: 'studentmanage/fetchDeleteStudent',
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



    cancalEditStudent = () => {
        this.setState({ editStudentVisible: false })
        this.resetStudentForm()
    }

    handleEdit = (e) => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const data = { ...values, id: this.state.editStudentId }
            if (!err) {
                dispatch({
                    type: 'studentmanage/fetchEditStudent',
                    payload: {
                        ...data,
                        callback: (res) => {
                            this.setState({ editStudentVisible: false })
                            this.refreshTable()
                        }
                    }
                })
            }
        })
    }

    resetStudentForm = () => {
        const { form } = this.props;
        form.resetFields()
    }

    editStudent = (record) => {
        console.log(record)
        const { form } = this.props;
        this.setState({editStudentVisible:true,editStudentId:record.id})
        form.setFieldsValue({
            studentName: record.studentName,
            studentNo: record.studentNo,
            idCard: record.idCard,
            sex: record.sex,
            birthday:record.birthday,
            hobby:record.hobby,
            phone:record.phone,
            description:record.description,
            lastLoginTime:record.lastLoginTime,
            remarks:record.remarks,
          })
    }

    render() {
        const { loading, studentlist, form } = this.props;
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
                title: '学生名称',
                dataIndex: 'studentName',
                width: 200,
                fixed: 'left',
            },
            {
                title: '学生编号',
                dataIndex: 'studentNo',
                width: 200,
            },
            {
                title: '身份证',
                dataIndex: 'idCard',
                width: 200,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 200,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 200,
            },
            {
                title: '爱好',
                dataIndex: 'hobby',
                width: 200,
            },
            {
                title: '电话',
                dataIndex: 'phone',
                width: 200,
            },
            {
                title: '介绍',
                dataIndex: 'description',
                width: 200,
            },
            {
                title: '最后登录时间',
                dataIndex: 'lastLoginTime',
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
                        <a onClick={() => { this.editStudent(record) }}>编辑</a>
                        {/* <span className="ant-divider" />
                        <a onClick={() => { this.deleteStudent(record) }}>删除</a> */}
                    </Fragment>
                }
            }
        ]

        const addStudentModal = (
            <StudentModal
                visible={this.state.addStudentVisible}
                cancleSubmit={this.cancelAddStudent}
                handleSubmit={this.handleSubmit}
                form={form}
                title={'新增学生信息'}
            />
        )

        const editeStudentModal = (
            <StudentModal
                visible={this.state.editStudentVisible}
                cancleSubmit={this.cancalEditStudent}
                handleSubmit={this.handleEdit}
                title={'修改学生信息'}
                form={form}
            />
        )
        
        return (
            <PageHeaderWrapper title="学生管理">
                {addStudentModal}
                {editeStudentModal}
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={this.addStudent}>
                                添加
                            </Button>
                            <Button icon="delete" type="primary" onClick={this.deleteStudent}>
                                批量删除
                            </Button>
                        </div>
                        <StandardTable
                            size="middle"
                            scroll={{ x: 1500, y: 700 }}
                            selectedRows={selectedRows}
                            loading={loading}
                            pagination={pagination}
                            dataSource={studentlist && studentlist.records}
                            columns={columns}
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

export default StudentList;
