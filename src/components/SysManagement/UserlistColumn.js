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
  Badge
} from 'antd';
import DetailMenu from '@/components/SysManagement/DetailMenu';

const statusMap = {'启用':'green','禁用': 'red'}

export default function UserlistColumn(styles, updatePassword,editUser,rolelist) {
  return [
    {
      title: '序号',
      dataIndex: 'title',
      width: 50,
      render:(text,record,index)=>`${index+1}`,
      fixed: 'left',
    },
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
      title: '角色',
      dataIndex: 'roles',
      width: 220,
      render:(data)=>{
        return data.map((item,index,arr)=>{
        return index === arr.length -1?<span key={index}>{getRole(rolelist,item)}</span>:<React.Fragment key={index}><span>{getRole(rolelist,item)}</span><span className="ant-divider" /></React.Fragment>
        })
      }
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
      dataIndex: 'sex_text',
      // render: data => {
      //   return data === 0 ? '男' : '女';
      // },
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
    // {
    //   title: '机构编码',
    //   dataIndex: 'orgCode',
    //   width: 100,
    // },
    {
      title: '用户状态',
      dataIndex: 'status_text',
      render:(data)=>{
        return <Badge text={data} color={statusMap[`${data}`]}/>;
      },
      width: 100,
    },
    // {
    //   title: '删除状态',
    //   dataIndex: 'delFlag',
    //   render: data => {
    //     return data === 1 ? '正常使用' : '已删除';
    //   },
    //   width: 100,
    // },
    {
      title: '工号',
      dataIndex: 'empNo',
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'createBy_text',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200,
    },
    {
      title: '更新人',
      dataIndex: 'updateBy_text',
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
    // {
    //   title: '删除时间',
    //   dataIndex: 'deleteTime',
    //   width: 100,
    // },
    {
      title: '操作',
      // render: () => (
      //   <Fragment>
      //     <Dropdown overlay={<DetailMenu openDetailDrawer={openDetailDrawer} />}>
      //       <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      //         更多 <Icon type="down" />
      //       </a>
      //     </Dropdown>
      //   </Fragment>
      // ),
      render: (_, record) => {
        return <Fragment>
            <a onClick={() => { editUser(record) }}>详情</a>
            <span className="ant-divider" />
            <a onClick={() => { updatePassword(record) }}>修改密码</a>
        </Fragment>
    },
      width: 150,
      fixed: 'right',
    },
  ];
}


function getRole (arr,indexdata) {
  var data = null;
    arr&&arr.forEach((item,key)=>{
      if(item.id === indexdata){
        data = item.roleName
      }
    })
    return data
}