import React, { Component } from 'react';
import { Modal, Form, Button, Input } from 'antd';

const { FormItem } = Form;
class LoginForm extends Component {
  handleLogin = () => {
    const { form: { validateFields }, onOk } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    })
  }

  render() {
    const { 
      form: { getFieldDecorator },
      visible, 
      onCancel,
    } = this.props;
    const modalProps = {
      visible,
      onOk: this.handleLogin,
      onCancel,
      title: "请输入昵称",
    };
    return (
      <Modal {...modalProps}>
        <Form>
          <FormItem label="昵称" help>
          {getFieldDecorator('username',{
            rules: [
              {required: true}
            ]
          })(
            <Input />
          )}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary" onClick={this.handleLogin}>登录</Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
const Login = (Form.create({ name: 'login' })(LoginForm))
export default Login;