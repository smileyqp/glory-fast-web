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

export default class DetailMenu extends PureComponent {
  render() {
    const { openDetailDrawer } = this.props;
    return (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={openDetailDrawer}>
            详情
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log('xiangqing');
            }}
          >
            密码
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              console.log('xiangqing');
            }}
          >
            删除
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}
