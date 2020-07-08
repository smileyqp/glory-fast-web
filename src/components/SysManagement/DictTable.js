import React, { PureComponent } from 'react';
import {
  Table,
} from 'antd';
import classNames from 'classnames';


export default class DictTable extends PureComponent {
  render() {
    const { dataSource ,loading ,handleSelect,editDictlist,type} = this.props;
   
    var columns = [
        {
            title: '序号',
            dataIndex: 'title',
            width: 50,
            render:(text,record,index)=>`${index+1}`,
          },
        {
          title: type==='parent'?'字典名称':'名称',
          dataIndex: type==='parent'?'dictName':'itemText',
          width: 100,
        },
        {
          title: type==='parent'?'字典代码':'值',
          dataIndex: type==='parent'?'dictCode':'itemValue',
          width: 100,
        },
        {
          title: '排序',
          dataIndex: 'sortOrder',
          width: 100,
          show:false
        },
        {
            title: '描述',
            dataIndex: 'description',
            width: 200,
        },
        // {
        //     title: '备注',
        //     dataIndex: 'remarks',
        //     width: 200,
        // },
        // {
        //   title: '创建人',
        //   dataIndex: 'createBy_text',
        //   width: 200,
        // },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 200,
        },
        // {
        //     title: '更新人',
        //     dataIndex: 'updateBy_text',
        //     width: 200,
        // },
        // {
        //     title: '更新时间',
        //     dataIndex: 'updateTime',
        //     width: 200,
        // },
    ]
    if(type === 'parent'){
     columns.splice(3,1)
    }


    return (
        <Table 
          bordered  
          size="small"
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
