import React, { PureComponent } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import numeral from 'numeral';
import { connect } from 'dva';
import { formatWan } from '@/utils/utils';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ userlist }) => ({
  userlist,
}))
class RoleManagement extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
  }
  render() {
    return <PageHeaderWrapper></PageHeaderWrapper>;
  }
}

export default RoleManagement;
