import React, { PureComponent, Fragment } from 'react';
import {
  Card,
  Icon,
  Dropdown,
  Menu,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Cascader,
  AutoComplete,
  Checkbox,
  Upload,
  message,
} from 'antd';
import DetailMenu from '@/components/SysManagement/DetailMenu';
export default function UserlistColumn(styles, openDetailDrawer) {
  return [
    {
      title: '用户姓名',
      dataIndex: 'username',
      width: 100,
      fixed: 'left',
    },
    {
      title: '用户账号',
      dataIndex: 'loginName',
      width: 120,
    },
    {
      title: '头像',
      dataIndex: 'photo',
      ellipsis: true,
      render: data => <img src={data} className={styles.userphoto} alt="头像" />,
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: data => {
        return data === 0 ? '男' : '女';
      },
      width: 100,
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      width: 200,
    },
    {
      title: '手机号码',
      dataIndex: 'telephone',
      width: 200,
    },
    {
      title: '电子邮件',
      dataIndex: 'email',
      width: 220,
    },
    {
      title: '机构编码',
      dataIndex: 'orgCode',
      width: 100,
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      render: data => {
        return data === 1 ? '启用' : '禁用';
      },
      width: 100,
    },
    {
      title: '删除状态',
      dataIndex: 'delFlag',
      render: data => {
        return data === 1 ? '正常使用' : '已删除';
      },
      width: 100,
    },
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200,
    },
    {
      title: '更新人',
      dataIndex: 'updateBy',
      width: 100,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 200,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      width: 200,
    },
    {
      title: '删除时间',
      dataIndex: 'deleteTime',
      width: 100,
    },
    {
      title: '操作',
      render: () => (
        <Fragment>
          <Dropdown overlay={<DetailMenu openDetailDrawer={openDetailDrawer} />}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              更多 <Icon type="down" />
            </a>
          </Dropdown>
        </Fragment>
      ),
      width: 200,
      fixed: 'right',
    },
  ];
}