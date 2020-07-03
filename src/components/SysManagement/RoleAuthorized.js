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
  Tree
} from 'antd';
import classNames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';
const { TreeNode } = Tree;

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
 
export default class RoleAuthorized extends PureComponent {

    state = {
       
      };
    
      renderTreeNodes = data =>
        data&&data.map(item => {
            if(item.isLeaf){item.isLeaf =null}
            if (item.children) {
                return (
                <TreeNode title={item.name} key={item.id} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
                );
            }
            return <TreeNode key={item.id} {...item} title={item.name}/>;
        });
    
  render() {
    const { handleSubmit ,visible ,cancleSubmit ,title,onExpand,onCheck,onSelect,expandedKeys,autoExpandParent,checkedKeys,selectedKeys} = this.props;
    
    return (
        <Modal
        title={'角色授权'}
        visible={visible}
        onCancel={cancleSubmit}
        onOk={handleSubmit}
      >
        <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
        >
            {this.renderTreeNodes(this.props.data)}
        </Tree>

      </Modal>
    );
  }
}
