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
  Card,
  Modal,
  TreeSelect
} from 'antd';
import classNames from 'classnames';
import { SettingOutlined } from '@ant-design/icons';
import IconModal from './IconModal'

const directionIcons = ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left', 'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right', 'up-circle', 'down-circle', 'left-circle', 'right-circle', 'up-circle-o', 'down-circle-o', 'right-circle-o', 'left-circle-o', 'double-right', 'double-left', 'vertical-left', 'vertical-right', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'play-circle', 'play-circle-o', 'up-square', 'down-square', 'left-square', 'right-square', 'up-square-o', 'down-square-o', 'left-square-o', 'right-square-o', 'login', 'logout', 'menu-fold', 'menu-unfold', 'border-bottom', 'border-horizontal', 'border-inner', 'border-left', 'border-right', 'border-top', 'border-verticle', 'pic-center', 'pic-left', 'pic-right', 'radius-bottomleft', 'radius-bottomright', 'radius-upleft', 'radius-upright', 'fullscreen', 'fullscreen-exit']
const suggestionIcons = ['question', 'question-circle', 'plus', 'plus-circle', 'pause', 'pause-circle', 'minus', 'minus-circle', 'plus-square', 'minus-square', 'info', 'info-circle', 'exclamation', 'exclamation-circle', 'close', 'close-circle', 'close-square', 'check', 'check-circle', 'check-square', 'clock-circle', 'warning', 'issues-close', 'stop']
const editIcons = ['edit', 'form', 'copy', 'scissor', 'delete', 'snippets', 'diff', 'highlight', 'align-center', 'align-left', 'align-right', 'bg-colors', 'bold', 'italic', 'underline', 'strikethrough', 'redo', 'undo', 'zoom-in', 'zoom-out', 'font-colors', 'font-size', 'line-height', 'colum-height', 'dash', 'small-dash', 'sort-ascending', 'sort-descending', 'drag', 'ordered-list', 'radius-setting']
const dataIcons = ['area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'line-chart', 'radar-chart', 'heat-map', 'fall', 'rise', 'stock', 'box-plot', 'fund', 'sliders']
const webIcons = ['lock', 'unlock', 'bars', 'book', 'calendar', 'cloud', 'cloud-download', 'code', 'copy', 'credit-card', 'delete', 'desktop', 'download', 'ellipsis', 'file', 'file-text', 'file-unknown', 'file-pdf', 'file-word', 'file-excel', 'file-jpg', 'file-ppt', 'file-markdown', 'file-add', 'folder', 'folder-open', 'folder-add', 'hdd', 'frown', 'meh', 'smile', 'inbox', 'laptop', 'appstore', 'link', 'mail', 'mobile', 'notification', 'paper-clip', 'picture', 'poweroff', 'reload', 'search', 'setting', 'share-alt', 'shopping-cart', 'tablet', 'tag', 'tags', 'to-top', 'upload', 'user', 'video-camera', 'home', 'loading', 'loading-3-quarters', 'cloud-upload', 'star', 'heart', 'environment', 'eye', 'camera', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customer-service', 'qrcode', 'scan', 'like', 'dislike', 'message', 'pay-circle', 'calculator', 'pushpin', 'bulb', 'select', 'switcher', 'rocket', 'bell', 'disconnect', 'database', 'compass', 'barcode', 'hourglass', 'key', 'flag', 'layout', 'printer', 'sound', 'usb', 'skin', 'tool', 'sync', 'wifi', 'car', 'schedule', 'user-add', 'user-delete', 'usergroup-add', 'usergroup-delete', 'man', 'woman', 'shop', 'gift', 'idcard', 'medicine-box', 'red-envelope', 'coffee', 'copyright', 'trademark', 'safety', 'wallet', 'bank', 'trophy', 'contacts', 'global', 'shake', 'api', 'fork', 'dashboard', 'table', 'profile', 'alert', 'audit', 'branches', 'build', 'border', 'crown', 'experiment', 'fire', 'money-collect', 'property-safety', 'read', 'reconciliation', 'rest', 'security-scan', 'insurance', 'interation', 'safety-certificate', 'project', 'thunderbolt', 'block', 'cluster', 'deployment-unit', 'dollar', 'euro', 'pound', 'file-done', 'file-exclamation', 'file-protect', 'file-search', 'file-sync', 'gateway', 'gold', 'robot', 'shopping']
const logoIcons = ['android', 'apple', 'windows', 'ie', 'chrome', 'github', 'aliwangwang', 'dingding', 'weibo-square', 'weibo-circle', 'taobao-circle', 'html5', 'weibo', 'twitter', 'wechat', 'youtube', 'alipay-circle', 'taobao', 'skype', 'qq', 'medium-workmark', 'gitlab', 'medium', 'linkedin', 'google-plus', 'dropbox', 'facebook', 'codepen', 'amazon', 'google', 'codepen-circle', 'alipay', 'ant-design', 'aliyun', 'zhihu', 'slack', 'slack-square', 'behance', 'behance-square', 'dribbble', 'dribbble-square', 'instagram', 'yuque', 'alibaba', 'yahoo']
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
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
const {Option} = Select;
  export default class AddPermissionListDrawer extends PureComponent {
    state = {
        iconChooseVisible:false,
        selecteditem:null
    }
    openIconChoose = () => {
        this.setState({iconChooseVisible:true})
    }
    closeIconChoose = () => {
        const {form} = this.props;
        form.setFieldsValue({icon:null})
        this.setState({iconChooseVisible:false,selecteditem:null})
    }
    confirmIconChoose = () => {
        this.setState({iconChooseVisible:false})
    }


    selectIcon = (icon) => {
        const { form } = this.props;
        this.setState({selecteditem:icon})
        form.setFieldsValue({
            icon:icon
        })
    } 
    render(){
        const {visible ,handleCancel,handleSubmit,form,treeData,title} = this.props;
        const { getFieldDecorator } = form;

    const iconmodal = (
        <IconModal
        handleCancel = {this.closeIconChoose}
        handleOk = {this.confirmIconChoose}
        visible = {this.state.iconChooseVisible}
        selectIcon = {this.selectIcon}
        selecteditem = {this.state.selecteditem}
        />
    )
        
    return(
    <Modal
        title={title}
        width={720}
        visible={visible}
        onClose={handleCancel}
        bodyStyle={{ paddingBottom: 80 }}
        onOk={handleSubmit}
        onCancel={handleCancel}
    >
        {iconmodal}
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Form.Item
                label={'菜单类型'}
            >
                <RadioGroup name="radiogroup" defaultValue={1}>
                    <Radio value={1}>菜单</Radio>
                    <Radio value={2}>按钮/权限</Radio>
                </RadioGroup>
            </Form.Item>

            <Form.Item
                label={'菜单名称'}
                >
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入菜单名称!', whitespace: true }],
                })(<Input />)}
            </Form.Item>
            <Form.Item
                label={'是否子节点'}
                >
                {getFieldDecorator('isLeaf', {
                    rules: [{  message: '请选择其类型!',required:true }],
                })(<Select style={{ width: '100%' }}>
                    <Option value={1}>是</Option>
                    <Option value={2}>否</Option>
                </Select>)}
            </Form.Item>

            <Form.Item
                label={'上级菜单'}
                >
                {getFieldDecorator('parentId', {
                    rules: [{  message: '请选择上级菜单!', whitespace: true }],
                })(<TreeSelect   treeData={treeData}   style={{ width: '100%' }}/>)}
            </Form.Item>

            <Form.Item
                label={'菜单路径'}
                >
                {getFieldDecorator('url', {
                    rules: [{ required: true, message: '请输入菜单路径!', whitespace: true }],
                })(<Input />)}
            </Form.Item>
            <Form.Item
                label={'前端组件名称'}
                >
                {getFieldDecorator('componentName', {
                    rules: [{ required: true, message: '请输入前端组件名称!', whitespace: true }],
                })(<Input />)}
            </Form.Item>

            <Form.Item
                label={'前端组件'}
                >
                {getFieldDecorator('component', {
                    rules: [{ required: true, message: '请输入前端组件!', whitespace: true }],
                })(<Input />)}
            </Form.Item>
            
            <Form.Item
                label={'菜单图标'}
                >
                {getFieldDecorator('icon', {
                    rules: [{  message: '请选择菜单图标!', whitespace: true }],
                })(<Input addonAfter={<SettingOutlined onClick = {this.openIconChoose}/>}/>)}
            </Form.Item>

            <Form.Item
                label={'排序'}
                >
                {getFieldDecorator('sortNo', {
                    rules: [{ required: true, message: '请输入排序号!' }],
                })(<Input />)}
            </Form.Item>
        </Form>
    </Modal>
    )
    }
  }








