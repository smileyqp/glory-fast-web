import React, { PureComponent } from 'react';
import {
  Menu,
  Drawer,
  Form,
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
} from 'antd';
import classNames from 'classnames';

export default class UserdetailDrawer extends PureComponent {
  render() {
    const { closeDetaildrawer, detailDrawervisible } = this.props;
    return (
      <Drawer
        title="详情"
        placement="right"
        closable={false}
        onClose={closeDetaildrawer}
        visible={detailDrawervisible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );
  }
}
