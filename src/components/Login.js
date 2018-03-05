import React from 'react';
import { connect } from 'dva';

import { Form, Icon, Input, Button } from 'antd';
import styles from '../assets/generalStyles.css';
import Auth from '../../modules/Auth';
import axios from 'axios';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    /*
     * e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    */
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios({
          method: 'post',
          url: '/auth/login',
          data: {
            email: values.email,
            password: values.password
          }
        }).then(function (response) {
          console.log("RESPONSE", response);
          Auth.authenticateUser(response.data.token, response.data.user._id);
        }).catch(function (error) {
          console.log("ERROR", error.message, JSON.stringify(error) );
          // === DISPLAY ERRORS
        });
      }
    }); 
  }
  render() {
    console.log("PROPS", this.props);
    const { getFieldDecorator } = this.props.form;
    return (
      <div>

       <Form onSubmit={this.handleSubmit} className={styles.paddedForm}>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your e-mail address' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="e-mail" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="password" />
          )}
        </FormItem>
        <FormItem>
          <Button size="large" type="primary" htmlType="submit" 
            className={[styles.fullWidthButton, styles.btnPrimary].join(' ')}>
            Sign in
          </Button>
        </FormItem>
      </Form>
      
     </div>
    
    );
  }
}


const WrappedLoginForm = Form.create()(NormalLoginForm);

function mapStateToProps(state) {
  return { formMode: state.formMode };
}

export default connect(mapStateToProps)(WrappedLoginForm);
