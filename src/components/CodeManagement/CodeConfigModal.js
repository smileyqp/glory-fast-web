import React, { PureComponent } from 'react';
import {
  Menu,
  Drawer,
  Select,
  DatePicker,
  Tooltip,
  Cascader,
  AutoComplete,
  Checkbox,
  Upload,
  message,
  Input,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Icon,
  Table,
  Popconfirm,
} from 'antd';
import classNames from 'classnames';
const {Option} = Select;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '列名',
        dataIndex: 'fieldName',
        editable: true,
      },
      {
        title: '说明',
        dataIndex: 'fieldComment',
        editable: true,
      },
      {
        title: '物理类型',
        dataIndex: 'jdbcType',
        editable: true,
      },
      {
        title: 'Java类型',
        dataIndex: 'javaType',
        render:(data)=>{
            return  <Select defaultValue="lucy" defaultValue = {data}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        }
      },
      {
        title: 'Java属性名称',
        dataIndex: 'javaFieldName',
        editable: true,
      },
      {
        title: '主键',
        dataIndex: 'ifPrimaryKey',
        render:(data)=>{
            return <Checkbox  checked={data === '1'?true:false}/>
        }
      },
      {
        title: '可空',
        dataIndex: 'ifBlank',
        render:(data)=>{
            return <Checkbox  checked={data === '1'?true:false}/>
        }
      },

      {
        title: '插入',
        dataIndex: 'ifInsert',
        render:(data)=>{
            return <Checkbox  checked={data === '1'?true:false}/>
        }
      },
      {
        title: '编辑',
        dataIndex: 'ifEdit',
        render:(data)=>{
            return <Checkbox  checked={data === '1'?true:false}/>
        }
      },
      {
        title: '列表',
        dataIndex: 'ifList',
        render:(data)=>{
            return <Checkbox  checked={data === '1'?true:false}/>
        }
      },
      {
        title: '查询',
        dataIndex: 'ifQuery',
        render:(data)=>{
            return <Checkbox  checked={data === '1'?true:false}/>
        }
      },
      {
        title: '查看匹配方式',
        dataIndex: 'queryType',
        render:(data)=>{
            return  <Select defaultValue={data} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        }
      },
      {
        title: '显示表单类型',
        dataIndex: 'showType',
        render:(data)=>{
            return  <Select defaultValue={data} >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        }
      },
      {
        title: '字典类型',
        dataIndex: 'dictType',
        editable: true,
      },
      {
        title: '字典表',
        dataIndex: 'dictTable',
        editable: true,
      },
      {
        title: '字典表字段',
        dataIndex: 'dictCode',
        editable: true,
      },
      {
        title: '字典文本字段',
        dataIndex: 'dictText',
        editable: true,
      },
      {
        title: '排序',
        dataIndex: 'sort',
        editable: true,
      }
    ];

    this.state = {
      dataSource: [],
    };
  }



  handleSave = row => {
      console.log(row)
    const newData = [...this.state.dataSource];
    const index = newData.forEach((item,index)=>{
        if(item.id === row.id){
            console.log(index)
            return index
        }
    })
  //  const index = newData.findIndex(item => row.id === item.id);
    console.log(index)
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const  dataSource  = this.props.genCodelist&&this.props.genCodelist
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
            scroll = {{x:2500}}
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            loading = {this.props.loading}
        />
      </div>
    );
  }
}


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

export default class CodeConfigModal extends PureComponent {
  render() {
    const { form ,handleSubmit ,visible ,cancleSubmit ,title,genCodelist,loading} = this.props;
    return (
        <Modal
        title={title}
        visible={visible}
        onCancel={cancleSubmit}
        onOk={handleSubmit}
        width = '80%'
      >
          <EditableTable 
          loading = {loading}
            genCodelist = {genCodelist}
          />
          
      </Modal>
    );
  }
}
