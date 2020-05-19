import React, { PureComponent } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import numeral from 'numeral';
import { connect } from 'dva';
import { formatWan } from '@/utils/utils';

@connect(({ userlist }) => ({
    userlist,
}))
class UserList extends PureComponent {
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
          type: 'user/fetchCurrent',
        });
    }
  render() {

    return (
<div>askjhaksj</div>
    );
  }
}

export default UserList;
