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
import EditableTable from './EditableTable'
const {Option} = Select;


export default class CodeConfigModal extends PureComponent {
  render() {
    const { form ,handleSubmit,saveGencodelist ,visible ,cancleSubmit ,title,genCodelist,loading,changeItem,handleSave} = this.props;
    //handleSave saveGencodelist
    return (
        <Modal
        title={title}
        visible={visible}
        onCancel={cancleSubmit}
        onOk={saveGencodelist}
        width = '80%'
      >
          <EditableTable 
          loading = {loading}
            genCodelist = {genCodelist}
            changeItem = {changeItem}
            handleSave = {handleSave}
          />
          
      </Modal>
    );
  }
}
