import React, { PureComponent } from 'react';
import { Icon ,Form ,Row,Col,Input,Button,Select} from 'antd';
import Link from 'umi/link';
import styles from './GlobalSearch.less'

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
export default class GlobalSearch extends PureComponent {
  componentWillUnmount() {

  }


  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  searchClick = (e) => {
    e.preventDefault();
    
    const {  form,handleSearch } = this.props;

    form.validateFields((err, fieldsValue) => {
        console.log(fieldsValue)
      const values = {
        ...fieldsValue,
      };
      handleSearch(values)
    });
  }


  renderItem = (arr) => {
    const { form: { getFieldDecorator },} = this.props;
    return   arr.map((item)=>{
        return  item.select? <Col md={8} sm={24} key = {item.label}>
          <FormItem label={item.label}>
            {getFieldDecorator(item.dataIndex)(
              <Select placeholder="请选择" style={{ width: '100px' }}>
                  {item.selectdata&&item.selectdata.map((i)=>{
                      return <Option value={i.value} key = {i.value}>{i.show}</Option>
                  })}
              </Select>
            )}
          </FormItem>
        </Col>
        :
        <Col md={8} sm={24} key = {item.label}>
            <FormItem label={item.label} >
                {getFieldDecorator(item.dataIndex)(<Input placeholder="请输入" />)}
            </FormItem>
        </Col>
        })
    }


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      toggleForm,
      expandForm,
      searchColumns
    } = this.props;
    return (
      <div className={styles.tableListForm}>
        <Form onSubmit={this.searchClick} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {this.renderItem(searchColumns.slice(0,3))}
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                <a style={{ marginLeft: 8 }} onClick={toggleForm}>
                  展开 <Icon type="down" />
                </a>
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }




  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
      toggleForm,
      expandForm,
      searchColumns
    } = this.props;
    return (
      <div className={styles.tableListForm}>
        <Form onSubmit={this.searchClick} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {this.renderItem(searchColumns)}
          </Row>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={toggleForm}>
                收起 <Icon type="up" />
              </a>
            </div>
          </div>
        </Form>
      </div>
    );
  }
  
  render() {
    const { expandForm } = this.props;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
}
