import React from 'react';
import { Icon, Drawer } from 'antd';
import classNames from 'classnames';

const UserdetailDrawer = () => {
  return (
    <Drawer
      title="详情"
      placement="right"
      closable={false}
      // onClose={this.closeDetaildrawer}
      visible={true}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default UserdetailDrawer;
