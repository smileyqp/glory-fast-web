import React, { PureComponent } from 'react';
import {
  Button,
} from 'antd';
import classNames from 'classnames';


export default class DictlistButtons extends PureComponent {
  render() {
    const { additem ,deleteitem ,styleclass ,disable,editItem} = this.props;
    return (
        <div className={styleclass}>
            <Button icon="plus" type="primary" onClick = {additem} disabled = {disable}>
            添加
            </Button>
            <Button icon="plus" type="primary" onClick = {deleteitem} disabled = {disable}>
            删除
            </Button>
            <Button icon="plus" type="primary" onClick = {editItem} disabled = {disable}>
            编辑
            </Button>
        </div>
    );
  }
}
