import React, { PureComponent } from 'react';
import {
  Icon,
  Drawer,
  Form,
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
  Radio,
  Card
} from 'antd';
import classNames from 'classnames';


const RadioGroup = Radio.Group;
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
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  export default class AddPermissionListDrawer extends PureComponent {
      render(){
          const {addDrawervisible ,handleCancel,handleSubmit,form} = this.props;
          const { getFieldDecorator } = form;
        return(
        <Drawer
            title="新增"
            width={720}
            visible={addDrawervisible}
            onClose={handleCancel}
            bodyStyle={{ paddingBottom: 80 }}
        >
        <Card>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item
                    label={
                    <span>
                        菜单类型&nbsp;
                        {/* <Tooltip title="您登陆账号?">
                        <Icon type="question-circle-o" />
                        </Tooltip> */}
                    </span>
                    }
                >
                <RadioGroup name="radiogroup" defaultValue={1}>
                        <Radio value={1}>一级菜单</Radio>
                        <Radio value={2}>子菜单</Radio>
                        <Radio value={3}>按钮/权限</Radio>
                    </RadioGroup>
                </Form.Item>
            </Form>

        </Card>
       



        </Drawer>
        )
      }
  }








