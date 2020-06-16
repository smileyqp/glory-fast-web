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
  Icon
} from 'antd';
import classNames from 'classnames';


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
    const { form ,handleSubmit ,visible ,cancleSubmit ,title} = this.props;
    return (
        <Modal
        title={title}
        visible={visible}
        onCancel={cancleSubmit}
        onOk={handleSubmit}
      >
          smileyqp
          
      </Modal>
    );
  }
}
