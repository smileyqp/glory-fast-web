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

const EditableContext = React.createContext();

const {Option} = Select;

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

export default class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.columns = [
        {
          title: '列名',
          dataIndex: 'fieldName',
        },
        {
          title: '属性名',
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
          render:(data,record,index)=>{
              return  <Select style={{width: '110px'}} defaultValue="String" defaultValue = {data} onChange={this.changeValue.bind(this,record,index)}>
              <Option value="String">String</Option>
              <Option value="Date">Date</Option>
              <Option value="Integer">Integer</Option>
              <Option value="Long">Long</Option>
              <Option value="Double">Double</Option>
              <Option value="Float">Float</Option>
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
          render:(data,record,index)=>{
              return  <Select style={{width: '110px'}} defaultValue={data} >
              <Option value="=">=</Option>
              <Option value="like">like</Option>
              <Option value="leftLike">leftLike</Option>
              <Option value="rightLike">rightLike</Option>
              <Option value=">=">&gt;=</Option>
              <Option value="<=">&lt;=</Option>
              <Option value="!=">!=</Option>
            </Select>
          }
        },
        {
          title: '显示表单类型',
          dataIndex: 'showType',
          render:(data)=>{
              return  <Select style={{width: '110px'}} defaultValue={data} >
              <Option value="input">文本框</Option>
              <Option value="number">数字框</Option>
              <Option value="date">日期框</Option>
              <Option value="datetime">日期时间</Option>
              <Option value="redio">单选框</Option>
              <Option value="checkbox">复选框</Option>
              <Option value="select">下拉框</Option>
              <Option value="textarea">文本域</Option>
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
      };
    }

    changeValue = (index,record) => {
        


        console.log(index,record)
    }
  
    render() {
      const {genCodelist,handleSave} = this.props;
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
            handleSave: handleSave,
          }),
        };
      });
      return (
        <div>
          <Table
              rowKey = {'id'}
              scroll = {{x:2500}}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={genCodelist}
              columns={columns}
              loading = {this.props.loading}
              handleSave = {handleSave}
          />
        </div>
      );
    }
  }
  