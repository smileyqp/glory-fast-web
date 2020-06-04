import React, { PureComponent } from 'react';
import {
  Table,
} from 'antd';
import classNames from 'classnames';


export default class DictTable extends PureComponent {
  render() {
    const { dataSource ,loading ,handleSelect,editDictlist,type} = this.props;
    const columns = [
        {
            title: '序号',
            dataIndex: 'title',
            width: 80,
            render:(text,record,index)=>`${index+1}`,
            fixed: 'left',
          },
        {
          title: type==='parent'?'字典名称':'名称',
          dataIndex: type==='parent'?'dictName':'itemText',
          width: 100,
          fixed: 'left',
        },
        {
          title: type==='parent'?'字典代码':'值',
          dataIndex: type==='parent'?'dictCode':'itemValue',
          width: 200,
        },
        {
            title: '描述',
            dataIndex: 'description',
            width: 200,
        },
        {
            title: '备注',
            dataIndex: 'remarks',
            width: 200,
        },
        {
          title: '创建人',
          dataIndex: 'createBy',
          width: 200,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 200,
        },
        {
            title: '更新人',
            dataIndex: 'updateBy',
            width: 200,
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            width: 200,
        },
     
    ]

    return (
        <Table 
            size="middle"
            scroll={{ x: 1500, y: 700 }}
            // selectedRows={selectedRows}
            dataSource = {dataSource}
            loading = {loading}
            columns = {columns}
            rowKey = {'id'}
            rowSelection = {{type:'radio',onSelect:handleSelect}}
        />
    );
  }
}